const { default: mongoose, model } = require("mongoose");

const UserSchema=new mongoose.Schema({
    email:String,
    password:String,
    confirmpass:String,
    username:String,
    address:String,
    contact:String,
})
export const UserModel=mongoose.models.users || new mongoose.model("users",UserSchema)