import mongoose from "mongoose"

// let ordersSchema=new mongoose.Schema({
//     user_Id:mongoose.Schema.Types.ObjectId,
//     foodItem_Id:[{ type: String }],
//     restro_Id:mongoose.Schema.Types.ObjectId,
//     deliveryBoy_Id:String,
//     status:String,
//     amount:String
// })
let ordersSchema = new mongoose.Schema({
    user_Id: mongoose.Schema.Types.ObjectId,
    foodItem_Id: [{ type: String }],
    restro_Id: mongoose.Schema.Types.ObjectId,
    deliveryBoy_Id: String,
    status: String,
    amount: Number
  })
export const ordersModel= mongoose.models.orders || mongoose.model("orders", ordersSchema);
