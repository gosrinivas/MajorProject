const mongoose=require('mongoose');
const initData=require("./data.js");
const listings=require("../models/listings.js");

const Mong_Url="mongodb://127.0.0.1:27017/wonderman";

main().then((res)=>{
    console.log("Mongoos connected.")
}).catch(err=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(Mong_Url);
}

const initDb= async ()=>{
    await  listings.deleteMany({});
    await listings.insertMany(initData.data);

    console.log("Data was initialized")


}

initDb();