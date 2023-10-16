import mongoose from "mongoose";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {email,password} = reqBody;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"user not exist"},{status:503})
        }
        const validPassword = await bcryptjs.compare(password,user.password)
        if(validPassword){
            const tokenData = {
                id: user._id,
                userName: user.userName,
                email: user.email
            }
            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});
            const response = NextResponse.json({message:"Login succesfully",success:true});
            response.cookies.set("token",token,{httpOnly:true});
            return response;
        }else{
            return NextResponse.json({error:"password didn't match"},{status:501})
        }
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}