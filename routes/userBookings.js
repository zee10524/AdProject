const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const BookingController = require("../controllers/booking");

router.get("/my-bookings", isLoggedIn, wrapAsync(BookingController.userBookings));

router.delete("/:bookingId", isLoggedIn, wrapAsync(BookingController.cancelBooking));

module.exports = router;
