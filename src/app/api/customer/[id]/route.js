import { foodModel } from "@/app/lib/foodsModel";
import { restaurantModel } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//     const id = await params.id;
//     await mongoose.connect(process.env.MONGO_URL)
//     let details = await restaurantModel.findOne({ _id: id })
//     let fooddetails = await foodModel.find({ restro_id: id })
//     return NextResponse.json({ success: true, details, fooddetails })
//   }
export async function GET(request, { params }){
  const id = (await params)?.id;
  if (!id || id === 'undefined') {
    return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
  }
  if (id.length !== 24) {
    return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
  }
  await mongoose.connect(process.env.MONGO_URL)
  let details = await restaurantModel.findOne({ _id: id })
  let fooddetails = await foodModel.find({ restro_id: id })
  return NextResponse.json({ success: true, details, fooddetails })
}

