import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("server connected");
        })
        connection.on('error',(err)=>{
            console.log("server not connected",err)
        })
    }catch(err){
        console.log("something went wrong! ",err);
    }
}