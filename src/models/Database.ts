import mongoose from "mongoose"


export const connectDB=async()=>{
    if(mongoose.connection.readyState>=1){
        console.log('Connection already exist');
        return mongoose.connection

    }else{
        const con =await mongoose.connect("mongodb://localhost:27017")
        console.log('DB IS CONNECTED');
        return con
    }
}