if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// ================= MODELS =================
const User = require("./models/user");

// ================= ROUTES =================
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const bookingRouter = require("./routes/booking");
const userBookingRouter = require("./routes/userBookings");
// ================= DATABASE =================
const MONGO_URL = process.env.MONGO_URI;
const PORT = 8080;

mongoose.connect(MONGO_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", [
    path.join(__dirname, "views"),
    path.join(__dirname, "layouts")   // 👈 add this
]);

app.engine("ejs", ejsMate);

// ================= BASIC MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ================= SESSION =================
const sessionOptions = {
    secret: process.env.SECRET || "mysupersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
};

app.use(session(sessionOptions));
app.use(flash());

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================= GLOBAL VARIABLES =================
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// ================= ROUTES =================
app.use("/listings", listingRouter);
app.use("/bookings", userBookingRouter);
app.use("/listings/:id/bookings", bookingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ================= 404 HANDLER =================
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});


// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    res.status(statusCode).render("error", { err });
});

// ================= SERVER START =================
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
