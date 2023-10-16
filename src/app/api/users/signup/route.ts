import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


export async function POST(request: NextRequest){
    try{
        const reqBody =await request.json();
        const {userName,email,password} = reqBody;
        console.log("userName",userName,email,password);
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error:'user already exist'},{status:400});
        }
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);
        const newUser = new User({
            userName,
            email,
            password:hashPassword
        });
        const savedUser = await newUser.save();
        console.log("savedUser",savedUser);
        return NextResponse.json({message:"user created succesfully",status:201,savedUser});

    }catch(err:any){
        console.log("err is",err);
        return NextResponse.json({error: err.message},{status:500});
    }
}
connect();