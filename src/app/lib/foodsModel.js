const { default: mongoose } = require("mongoose");

let foodSchema= new mongoose.Schema({
    name:String,
    price:Number,
    img_path:String,
    description:String,
    restro_id:mongoose.Schema.Types.ObjectId
})

export const foodModel=mongoose.models.foods || mongoose.model("foods",foodSchema);