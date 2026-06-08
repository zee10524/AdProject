const Listing = require("../models/listing");
const Booking = require("../models/booking");
const { acquireLock, releaseLock } = require("../utils/bookingLock");

module.exports.createBooking = async (req, res) => {

    const { id } = req.params;

    const { checkIn, checkOut, guests, guide, idempotencyKey } = req.body;

    // ✅ Idempotency check — if same key already exists, return the existing booking
    if (idempotencyKey) {
        const existing = await Booking.findOne({ idempotencyKey });
        if (existing) {
            req.flash("success", "Booking already confirmed!");
            return res.redirect(`/listings/${id}`);
        }
    }

    // 🔒 Acquire Redis lock for this listing
    const lockAcquired = await acquireLock(id);
    if (!lockAcquired) {
        req.flash("error", "Someone else is booking this listing right now. Please try again in a moment.");
        return res.redirect(`/listings/${id}`);
    }

    const listing = await Listing.findById(id);

    try {
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        // 🛑 Validate guest count
        if (guests > listing.maxGuests) {
            req.flash("error", "Guest limit exceeded");
            return res.redirect(`/listings/${id}`);
        }

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        if (end <= start) {
            req.flash("error", "Invalid date selection");
            return res.redirect(`/listings/${id}`);
        }

        // 🛑 Prevent double booking
        const existingBooking = await Booking.findOne({
            listing: id,
            $or: [
                {
                    checkIn: { $lt: end },
                    checkOut: { $gt: start }
                }
            ]
        });

        if (existingBooking) {
            req.flash("error", "Selected dates are already booked");
            return res.redirect(`/listings/${id}`);
        }

        // 💰 Calculate total price
        const days = (end - start) / (1000 * 60 * 60 * 24);
        const totalPrice = days * listing.price;

        const booking = new Booking({
            listing: id,
            user: req.user._id,
            checkIn: start,
            checkOut: end,
            guests,
            totalPrice,
            guide,
            idempotencyKey: idempotencyKey || undefined
        });

        await booking.save();

        listing.bookings.push(booking);
        await listing.save();

        req.flash("success", "Booking Confirmed!");
        res.redirect(`/listings/${id}`);

    } finally {
        // 🔓 Always release the lock — even if an error occurs
        await releaseLock(id);
    }
};


// ================= USER DASHBOARD =================
module.exports.userBookings = async (req, res) => {

    const bookings = await Booking.find({ user: req.user._id })
        .populate("listing")
        .sort({ createdAt: -1 });

    res.render("bookings/dashboard", { bookings });
};


// ================= CANCEL BOOKING =================
module.exports.cancelBooking = async (req, res) => {

    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
        req.flash("error", "Booking not found");
        return res.redirect("/bookings/my-bookings");
    }

    // Only owner can cancel
    if (!booking.user.equals(req.user._id)) {
        req.flash("error", "Unauthorized action");
        return res.redirect("/bookings/my-bookings");
    }

    booking.status = "cancelled";
    await booking.save();

    // Remove from listing reference
    await Listing.findByIdAndUpdate(booking.listing, {
        $pull: { bookings: booking._id }
    });

    req.flash("success", "Booking cancelled successfully!");
    res.redirect("/bookings/my-bookings");
};
