const mongoose=require("mongoose");
const schema=mongoose.Schema;
const Listingschema = new schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://unsplash.com/photos/brown-and-white-wooden-outdoor-lounge-chairs-near-swimming-pool-during-daytime-pQrXggKVvzI"
        }
    },
    price: Number,
    location: String,
    country: String
});


const listing=mongoose.model("listing",Listingschema);

module.exports=listing;