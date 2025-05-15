import { mongoose } from "mongoose";
import { DeliveryPartnerModel } from "@/app/lib/deliverypartnerModel";
import { NextResponse } from "next/server";

export async function GET(request ,{ params }){
  let city = (await params).city;
  await mongoose.connect(process.env.MONGO_URL);
  const filter = { address: { $regex: new RegExp(city, 'i') } }
  const result = await DeliveryPartnerModel.find(filter)
  return NextResponse.json({ result})
}