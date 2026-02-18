import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB =async()=>{
    try {
        const conn=await mongoose.connect(ENV.MONGO_URL);

        console.log("MongoDB connected successfully:", conn.connection.host);
        
    } catch (error) {
        console.log("Error connecting MongoDB",error);
        //   status code 1 means failure and 0 means success
        process.exit(1); 
    }
}