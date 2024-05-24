const mongoose=require("mongoose");
const Schema=mongoose.Schema

const reviewSchema=new Schema({
    comment:string,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    date:{
        type:date,
        default:Date.now()


    }
});

modules.exports= mongoose.model("review",reviewSchema);

