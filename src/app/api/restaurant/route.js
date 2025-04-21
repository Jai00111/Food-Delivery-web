
import { restaurantModel } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      const data = await restaurantModel.find();
      console.log(data);
      return NextResponse.json({result:data, success: true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false });
    }
  }


  
export async function POST(req,res){
    await mongoose.connect(process.env.MONGO_URL);
    let payload=await req.json();
    let data= new restaurantModel(payload)
    data=await data.save();
    return NextResponse.json({result:data, success:true})
}