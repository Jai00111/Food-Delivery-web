import { DeliveryPartnerModel } from "@/app/lib/deliverypartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload=await request.json();
    let success=false;
    await mongoose.connect(process.env.MONGO_URL);
    let deliverypartner=new DeliveryPartnerModel(payload);
    const result=await deliverypartner.save();
    if(result){
        success=true;
    }
    return NextResponse.json({result, success})
}