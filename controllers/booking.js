const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.createBooking = async (req, res) => {

    const { id } = req.params;

    const { checkIn, checkOut, guests, guide } = req.body;

    const listing = await Listing.findById(id);

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
        guide
    });

    await booking.save();

    listing.bookings.push(booking);
    await listing.save();

    req.flash("success", "Booking Confirmed!");
    res.redirect(`/listings/${id}`);
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
