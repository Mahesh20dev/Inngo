const Review=require("../models/review.js");
const Listing=require('../models/listing.js');


module.exports.addreview=async(req,res,next)=>{
    let listing=await Listing.findById(req.params.id);
   const newreview=new Review( req.body.review);
   newreview.author=req.user._id;
   listing.reviews.push(newreview);
    if (!listing.geometry || !listing.geometry.type) {
    req.flash("error", "This listing is missing location data.");
    return res.redirect(`/listings/${listing._id}`);
    }
    await newreview.save();
    await listing.save();
    // console.log(listing)
   

    req.flash("success","New review Created")
    res.redirect(`/listings/${listing.id}`);
}

module.exports.deletereview=async(req,res)=>{
    let {id,reviewid}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","Review deleted")

    res.redirect(`/listings/${id}`);
}