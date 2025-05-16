const User=require("../models/user.js");
const Listing=require('../models/listing.js');


module.exports.signupform=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
   try{
    let {username,email,password}=req.body;
    const newUser=new User({email,username});
   const registeredUser = await User.register(newUser,password);
   req.login(registeredUser,(err)=>{
    if(err){ 
        return next(err);
    }
    req.flash("success", "Welcome to Inngo!");
   res.redirect("/listings"); 
   })
   }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
   } 
}

module.exports.loginform=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to Inngo!");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl); 
   }

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
}

module.exports.boats=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Boats', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}

module.exports.rooms=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Rooms', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}

module.exports.cities=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Cities', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}
module.exports.mountains=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Mountains', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}
module.exports.castles=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Castles', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}
module.exports.pools=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Pools', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}
module.exports.camping=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Camping', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}
module.exports.farms=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Farms', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}
module.exports.arctic=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Arctic', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}
module.exports.domes=async(req,res)=>{
    const results = await Listing.find({
        description: { $regex: 'Domes', $options: 'i' } 
    });
    res.render("searchResults.ejs", { results});
}

module.exports.search = async (req, res) => {
    const searchTerm = req.query.keyword || '';
    console.log(searchTerm);
    const results = await Listing.find({
    tags: { $regex: searchTerm, $options: 'i' }  // Case-insensitive search
    });

    res.render("searchResults.ejs", { results });
};
