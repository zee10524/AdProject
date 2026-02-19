const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const BookingController = require("../controllers/booking");
const { isLoggedIn } = require("../middleware");

router.post("/", isLoggedIn, wrapAsync(BookingController.createBooking));

module.exports = router;
