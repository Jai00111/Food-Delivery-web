import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { UserModel } from "@/app/lib/userModel";

export async function POST(request) {
    let payload = await request.json();
    let success = false;
    let result;
    await mongoose.connect(process.env.MONGO_URL)
    if (payload.login) {
        
        result = await UserModel.findOne({ email: payload.email, password: payload.password })
        if(result){
            success=true
        }
        else{
            success=false
        }
    }
    else {
       
        let user = new UserModel(payload)
        result = await user.save();
        if (result) {
            success = true;
        }
    }

    return NextResponse.json({ result:result, success })
}
