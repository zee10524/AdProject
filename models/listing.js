const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: String,

    price: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    image: {
        url: String,
        filename: String
    },

    // 🔥 IMPORTANT: ADD THIS BACK
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    maxGuests: {
        type: Number,
        default: 2
    },

    roomsAvailable: {
        type: Number,
        default: 1
    },

    amenities: [
        {
            type: String
        }
    ],

    averageRating: {
        type: Number,
        default: 0
    },

    guide: {
        type: Boolean,
        default: false
    },


    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ],

}, { timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);
