import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const ConnectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {})
        console.log("Database connection established");
    }
    catch (e) {
        console.log("Error connecting to Mongoose  database " + e.message)
    }
}

export default ConnectDb;