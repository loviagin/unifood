import { NextResponse } from "next/server";
import connectDB from "../../db";
import UserData from "../../../models/UserData";
import { Types } from "mongoose";

export async function GET(request, { params }) {
    await connectDB();

    try {
        const { userId } = params;
        console.log("🔍 Запрашиваемый userId:", userId);

        if (!userId) {
            return NextResponse.json({ error: "userId обязателен" }, { status: 400 });
        }

        try {
            const userData = await UserData.findOne({ 
                userId: Types.ObjectId.createFromHexString(userId)
            });
            console.log("🔍 Найденные данные:", userData);

            if (!userData) {
                return NextResponse.json({ error: "Данные пользователя не найдены" }, { status: 404 });
            }

            return NextResponse.json({
                bonuses: userData.bonuses,
                level: userData.level,
                nextLevel: userData.nextLevel,
                progress: userData.progress
            }, { status: 200 });

        } catch (error) {
            console.error("Ошибка при обработке userId:", error);
            return NextResponse.json({ error: "Некорректный формат userId" }, { status: 400 });
        }

    } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
} 