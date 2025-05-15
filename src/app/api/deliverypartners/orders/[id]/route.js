import { ordersModel } from "@/app/lib/ordersModel";
import { restaurantModel } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    const id=(await params).id
    let success=false;
    await mongoose.connect(process.env.MONGO_URL)
    let result=await ordersModel.find({deliveryBoy_Id:id})
    if(result){
        let restroData=await Promise.all(
            result.map(async (item)=>{
                let restroInfo={};
                restroInfo.data=await restaurantModel.findOne({_id:item.restro_Id})
                restroInfo.amount=item.amount;
                restroInfo.status=item.status;
                return restroInfo;
            })
        )
        result=restroData;
        success=true;
    }
    return NextResponse.json({result, success});
}