import { DeliveryPartnerModel } from "@/app/lib/deliverypartnerModel";
import { mongoose } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
  await mongoose.connect(process.env.MONGO_URL);
  const payload = await request.json();
  let success=false;
  let result=await DeliveryPartnerModel.findOne({mobile:payload.loginMobile, password:payload.loginPassword})
  if(result){
    success=true;
  }
  return NextResponse.json({result, success})
}