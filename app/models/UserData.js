import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    bonuses: { type: Number, required: true },
    level: { type: String, required: true },
    nextLevel: { type: Number, required: true },
    progress: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.UserData || mongoose.model("UserData", UserDataSchema);
