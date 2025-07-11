import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config(); // Load .env  variable


const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfull")
    } catch (error) {
        console.log("MongoDB Connected Failed", error.message)
        process.exit(1);
    }
}

export default connectDB