
import { restaurantModel } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const data = await restaurantModel.find();
    console.log(data);
    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}



export async function POST(req, res) {

  let payload = await req.json();
  let result;
  let success=false;
  await mongoose.connect(process.env.MONGO_URL);
  if (payload.login) {
    result = await restaurantModel.findOne({ email: payload.email, password: payload.password })
    success=true;
  }
   else {
    let data = new restaurantModel(payload)
    result = await data.save();
    if(result){
      success=true;
    }
  }

  return NextResponse.json({ result: result, success })
}