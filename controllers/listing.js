const Listing = require("../models/listing");

// ================= INDEX =================
module.exports.index = async (req, res) => {
    // if (req.query.q) {
    //     const query = req.query.q;
    //     console.log(query);
        
    //     const allListings = await Listing.find({
    //         $text: { $search: query }
    //     });

    //     if (allListings.length === 0) {
    //         req.flash("error", "No listings found.");
    //         return res.redirect("/listings");
    //     }

    //     return res.render("listings/index", { allListings });
    // }

    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};


// ================= NEW FORM =================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};


// ================= SHOW =================
module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
                model: "User"
            }
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not exist.");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};



// ================= CREATE =================
module.exports.createListing = async (req, res) => {

    // Convert amenities string → array
    if (req.body.listing.amenities) {
        req.body.listing.amenities =
            req.body.listing.amenities
                .split(",")
                .map(a => a.trim())
                .filter(a => a.length > 0);
    }

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await newListing.save();

    req.flash("success", "Hotel Listing Created!");
    res.redirect(`/listings/${newListing._id}`);
};


// ================= EDIT FORM =================
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exist.");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image?.url;

    if (originalImageUrl) {
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_200");
    }

    res.render("listings/edit", { listing, originalImageUrl });
};


// ================= UPDATE =================
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    // Convert amenities string → array
    if (req.body.listing.amenities) {
        req.body.listing.amenities =
            req.body.listing.amenities
                .split(",")
                .map(a => a.trim())
                .filter(a => a.length > 0);
    }

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
};


// ================= DELETE =================
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
};
