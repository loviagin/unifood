//app/api/users/route.js
import { NextResponse } from "next/server";
import connectDB from "../db";
import User from "../../models/User";
import UserData from "../../models/UserData";
import bcrypt from "bcryptjs";

export async function POST(request) {
    await connectDB(); // Подключаемся к MongoDB

    try {
        const contentType = request.headers.get("content-type");

        let body;
        if (contentType.includes("application/json")) {
            body = await request.json(); // Если JSON
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            body = Object.fromEntries(formData); // Если form-data
        } else {
            return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 400 });
        }

        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

        try {
            const ordersData = await Order.find({ userId });
            console.log("🔍 Найденные данные:", userData);

            if (!ordersData) {
                return NextResponse.json({ error: "Данные не найдены" }, { status: 404 });
            }

            return NextResponse.json({
                ordersData
            }, { status: 200 });

        } catch (error) {
            console.error("Ошибка при обработке userId:", error);
            return NextResponse.json({ error: "Некорректный формат userId" }, { status: 400 });
        }
    }