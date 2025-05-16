const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');

}
main().then((res)=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

const initDB=async()=>{
    await Listing.deleteMany();
    initData.data = initData.data.map((obj)=>({...obj,owner:"680f25aa0abaee16185c0ec0"}));
    await Listing.insertMany(initData.data);
    console.log("data inserted");
}

initDB();