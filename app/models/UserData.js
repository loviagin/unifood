import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    bonuses: { type: Number, required: true },
    type: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.UserData || mongoose.model("UserData", UserDataSchema);