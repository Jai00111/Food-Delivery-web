import { restaurantModel } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    await mongoose.connect(process.env.MONGO_URL)
    let result= await restaurantModel.find();
    result=result.map((item)=>(item.address?.charAt(0).toUpperCase()+ item.address?.slice(1)));
    result=[...new Set(result.map((item)=>item))]   //duplicate values ko remove krne k liye use hota h 
    return NextResponse.json({result:result,success:true})
    
}