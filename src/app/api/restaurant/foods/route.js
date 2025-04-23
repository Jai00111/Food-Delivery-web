import {mongoose} from "mongoose"
import { NextResponse } from "next/server";
import { foodModel } from "@/app/lib/foodsModel";

export async function POST(request){
    let payload=await request.json();
    let success=false;
    await mongoose.connect(process.env.MONGO_URL);
    let food= new foodModel(payload);
    let result= await food.save();
    if(result){
        success=true;
    }
    return NextResponse.json({result , success})
}