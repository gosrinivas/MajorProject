const express=require('express');const { mongo, default: mongoose } = require('mongoose');
;
const app=express();

const path=require("path");
const ejsMate=require("ejs-mate");

const methodOverride = require('method-override');

const listing=require("./models/listings.js");
const { nextTick } = require('process');
const Mong_Url="mongodb://127.0.0.1:27017/wonderman";
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const ListingSchema=require("./schema.js")
app.set( "view engine", "ejs" );
app.set( 'views', path.join(__dirname ,'views') );
app.use(express.urlencoded({extended : true}))  //to use req
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.use(methodOverride('_method'));
main().then((res)=>{
    console.log("Mongoos connected.")
}).catch(err=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(Mong_Url);
}

const validateListing = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(405, errMsg);
    } else {
        next();
    }
};

app.get("/", (req, res) => {
    console.log("I am root");
});

app.get("/listing", wrapAsync( async(req,res)=>{
    const list=await listing.find({});
    //res.send("its working!!!");
    res.render('listings/index.ejs',{list});
}) )
//new route
app.get("/listing/new",wrapAsync(  (req,res)=>{
    res.render( "listings/new.ejs")
}))

//show route
app.get("/listing/:id",wrapAsync(  async (req, res) => {
    let {id}=req.params;
    console.log(id)
    const Listing=await listing.findById(id);
    res.render("listings/show.ejs",{Listing});
   
}))

//create route

// app.post("/listing", wrapAsync( async(req,res,next)=>{
   
//      const newListing= new listing(req.body.listing);
//      await newListing.save();
//      res.redirect("/listing")
    
// }));
app.post("/listing",async (req, res, next) => {
    let {title, description, image, price, country, location} = req.body.listing;
    const newListing = new listing({
        title:title,
        description:description,
        location:location,
        country:country,
        price:price,
    });
    newListing.image.url = image;
    await newListing.save();
    console.log(newListing);
    res.redirect("/listing");
  });

//Edit route

app.get("/listing/:id/edit",wrapAsync(  async (req, res) => {
    let {id}=req.params;
    const Listing=await listing.findById(id);
    res.render("listings/edit.ejs",{Listing})
    

}))

//Update route

// app.put("/listing/:id",wrapAsync(  async (req,res)=>{
//     let {id}=req.params;
//     await listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listing/${id}`)
// }))

app.put("/listing/:id", wrapAsync(async (req, res, next) => {
    let {id} = req.params;

    console.log("putting")
    let {title, image, description, location, country, price}  = req.body.listing;

    
    let newL = await listing.findByIdAndUpdate(id, {
        title:title,
        description:description,
        location:location,
        country:country,
        price:price,
        'image.url' :image
    }, {new:true});
    console.log(newL);
    res.redirect(`/listing/${id}`);
    })
);

//Delete Route

app.delete("/listing/:id",wrapAsync(  async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listing")
}))



// app.use((err, req, res, next) => {
//     console.error(err.stack); // Log the stack trace for debugging
//     const { statusCode = 500, message = "Something went wrong" } = err;
//     if (!err.message) err.message = "Oh no, something went wrong!";
//     if (res.headersSent) {
//         return next(err);
//     }
//     res.status(statusCode).render("error.ejs", { message, err }); // Pass the whole error object
// });

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(405,"Page Not Found"));
// } )



app.use((err,req,res,next)=>{
   
    let {StatusCode=500,message="Something went wrong"}=err;

    if (res.headersSent) {
        return next(err);  // If headers are already sent, pass the error to the default Express error handler
    }
   

    res.status(StatusCode).render("error.ejs",{message});
    console.log(err)
})




app.listen(8080,()=>{
    console.log("app is running at port 8080");
});
