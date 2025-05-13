import { ordersModel } from "@/app/lib/ordersModel"
import { restaurantModel } from "@/app/lib/restaurantModels"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request){
    let response=await request.json()
    await mongoose.connect(process.env.MONGO_URL)
    let success=false;
    let orderObj=new ordersModel(response);
    let result= await orderObj.save();
    if(result){
        success=true;
    }
    return NextResponse.json({result, success})
}

export async function GET(request){
    await mongoose.connect(process.env.MONGO_URL)
    let id=request.nextUrl.searchParams.get("id");
    let result=await ordersModel.find({user_Id:id})
    if(result){
        let restroData= await Promise.all(
            result.map(async (item)=>{
            let restroInfo={};
            restroInfo.data=await restaurantModel.findOne({_id:item.restro_Id});
            restroInfo.amount=item.amount;
            restroInfo.status=item.status;
            return restroInfo;
        })
        )
        result=restroData;
    }
    return NextResponse.json({result:result,success:true})
}