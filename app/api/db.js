import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect('mongodb://unifood_a0:Iifuhw878u23ibrifjnuIUBjniuefr@127.0.0.1:27017/unifood?authSource=admin');
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ Error MongoDB:", err.message);
        process.exit(1);
    }
};

export default connectDB;