const { default: mongoose, model } = require("mongoose");

const DeliveryPartnerSchema=new mongoose.Schema({
    username:String,
    password:String,
    confirmpass:String,
    
    address:String,
    mobile:String,
})
export const DeliveryPartnerModel=mongoose.models.deliverypartners || new mongoose.model("deliverypartners",DeliveryPartnerSchema)