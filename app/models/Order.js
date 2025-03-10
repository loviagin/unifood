import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    details: { type: String, default: '' },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    bonuses: { type: Number, required: true },
    type: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);