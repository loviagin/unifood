import { NextResponse } from "next/server";
import connectDB from "../../db";
import Order from "../../../models/Order";
import UserData from "../../../models/UserData";
import { Types } from "mongoose";

export async function POST(request) {
    await connectDB();

    try {
        const body = await request.json();
        const { userId, title, details, amount, bonuses, type, date } = body;

        if (!userId || !title || amount === undefined || bonuses === undefined || !type) {
            return NextResponse.json({ error: "Не все обязательные поля заполнены" }, { status: 400 });
        }

        try {
            // Создаем новый заказ
            const order = new Order({
                userId: Types.ObjectId.createFromHexString(userId),
                title,
                details,
                amount,
                bonuses,
                type,
                date: new Date(date)
            });

            // Обновляем бонусы пользователя
            const userData = await UserData.findOne({ 
                userId: Types.ObjectId.createFromHexString(userId)
            });

            if (!userData) {
                return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
            }

            // Проверяем достаточно ли бонусов при списании
            if (type === "spend" && Math.abs(bonuses) > userData.bonuses) {
                return NextResponse.json({ error: "Недостаточно бонусов" }, { status: 400 });
            }

            // Обновляем количество бонусов
            userData.bonuses += bonuses;

            // Обновляем прогресс
            if (type === "earn") {
                userData.progress = Math.min(100, userData.progress + (amount / userData.nextLevel * 100));
                
                // Если достигли 100%, повышаем уровень
                if (userData.progress >= 100) {
                    if (userData.level === "Новичок") {
                        userData.level = "Постоянный клиент";
                        userData.nextLevel = 2000;
                    } else if (userData.level === "Постоянный клиент") {
                        userData.level = "VIP";
                        userData.nextLevel = 5000;
                    }
                    userData.progress = 0;
                }
            }

            // Сохраняем изменения
            await order.save();
            await userData.save();

            return NextResponse.json({ 
                message: "Заказ создан",
                orderId: order._id,
                newBonuses: userData.bonuses,
                newLevel: userData.level,
                newProgress: userData.progress
            }, { status: 201 });

        } catch (error) {
            console.error("Ошибка при обработке данных:", error);
            return NextResponse.json({ error: "Некорректный формат данных" }, { status: 400 });
        }

    } catch (error) {
        console.error("Ошибка сервера:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
