//app/api/users/route.js
import { NextResponse } from "next/server";
import connectDB from "../db";
import Order from "../../models/Order";
import { Types } from "mongoose";

export async function POST(request) {
    await connectDB();

    try {
        const contentType = request.headers.get("content-type");

        let body;
        if (contentType.includes("application/json")) {
            body = await request.json();
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            body = Object.fromEntries(formData);
        } else {
            return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 400 });
        }

        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ error: "userId обязателен" }, { status: 400 });
        }

        try {
            const orders = await Order.find({ 
                userId: Types.ObjectId.createFromHexString(userId) 
            }).sort({ date: -1 });
            console.log("Загружены заказы для userId:", orders);

            return NextResponse.json({ history: orders || [] }, { status: 200 });

        } catch (error) {
            console.error("Ошибка при обработке userId:", error);
            return NextResponse.json({ error: "Некорректный формат userId" }, { status: 400 });
        }
    } catch (error) {
        console.error("Ошибка при загрузке заказов:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
