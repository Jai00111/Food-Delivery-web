import mongoose from "mongoose"

let restaurantSchema=new mongoose.Schema({
    email:String,
    password:String,
    confirmpass:String,
    restaurantName:String,
    address:String,
    contact:String,

})
export const restaurantModel= mongoose.models.restaurants || mongoose.model("restaurants", restaurantSchema);
