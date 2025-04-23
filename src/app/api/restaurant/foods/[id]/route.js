import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { foodModel } from "@/app/lib/foodsModel";

export async function GET(req,res){
    let id= await res.params.id;
    let success =false

    await mongoose.connect(process.env.MONGO_URL)
    let response=await foodModel.find({restro_id:id})
    if(response){
        success=true;
    }
    return NextResponse.json({result:response, success})
}

export async function DELETE(req, res){
    await mongoose.connect(process.env.MONGO_URL)
    let success=false;
    const id=await res.params.id
   const response=await foodModel.deleteOne({_id:id})
    if(response.deletedCount>0){
        success=true;
    }
    return NextResponse.json({response, success})
}

