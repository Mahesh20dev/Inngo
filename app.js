if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require('express-session');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStratergy=require('passport-local');
const User=require("./models/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.json());
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

const atlas_url=process.env.ATLAS_KEY;


const listingsRoute=require("./routes/listing.js");
const reviewsRoute=require("./routes/reviews.js");
const userRoute=require("./routes/user.js");
const chatbotRoute = require("./routes/chatbot.js");
async function main(){
    await mongoose.connect(atlas_url);

}
main().then((res)=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

const store=MongoStore.create({
    mongoUrl:atlas_url,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
})

store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})



// restructured routes
app.use("/listings",listingsRoute);
app.use("/listings/:id/review",reviewsRoute);
app.use("/",userRoute);
app.use("/chatbot", chatbotRoute);


//middlewares and error handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404,"Page not Found!"));
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});


app.listen(3000,()=>{
    console.log("server started");
});
