import { foodModel } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    let url=new URL(request.url)
    let id=url.pathname.split('/').pop();
    let success=false;
    await mongoose.connect(process.env.MONGO_URL)
    const result=await foodModel.findById({_id:id})
    if(result){
        success=true;
    }
    return NextResponse.json({result,success})
}

export async function PUT(request){
    await mongoose.connect(process.env.MONGO_URL)
   
    const payload=await request.json();
    let url=new URL(request.url)
    let id=url.pathname.split("/").pop();
    let success=false;
    let result= await foodModel.findOneAndUpdate({_id:id},payload)
    if(result){
        success=true;
    }
    return NextResponse.json({result:result, success});
}