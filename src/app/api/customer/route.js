import { restaurantModel } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    await mongoose.connect(process.env.MONGO_URL)
    let queryParams = request.nextUrl.searchParams;
    console.log(queryParams)
    let filter = {};
    if (queryParams.get('location')) {
        let address = queryParams.get('location')
        filter = { address: { $regex: new RegExp(address, 'i') } }
    }
    else if (queryParams.get('restaurant')) {
        // let restaurantName=queryParams.get('restuarant')

        let restaurantName = queryParams.get('restaurant')

        filter = { restaurantName: { $regex: new RegExp(restaurantName, 'i') } }
    }
    let result = await restaurantModel.find(filter)
    return NextResponse.json({ success: true, result })
}