import { NextResponse } from "next/server";
import connectDB from "../../db";
import Order from "../../../models/Order";
import UserData from "../../../models/UserData";
import { Types } from "mongoose";
import { LEVELS, getLevelByName, getNextLevel } from "../../../constants/levels";

export async function POST(request) {
    await connectDB();

    try {
        const body = await request.json();
        const { userId, title, details, type, date } = body;
        
        // Преобразуем amount и bonuses в целые числа
        const amount = Math.round(Number(body.amount));
        const bonuses = Math.round(Number(body.bonuses));

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

            // Обновляем прогресс и уровень
            if (type === "earn") {
                const currentLevel = getLevelByName(userData.level);
                const nextLevelInfo = getNextLevel(userData.level);

                if (nextLevelInfo) {
                    // Обновляем прогресс
                    const progressIncrement = (amount / nextLevelInfo.requiredAmount) * 100;
                    userData.progress = Math.min(100, userData.progress + progressIncrement);

                    // Если достигли 100%, повышаем уровень
                    if (userData.progress >= 100 && nextLevelInfo) {
                        userData.level = nextLevelInfo.name;
                        userData.nextLevel = nextLevelInfo.nextLevel;
                        userData.progress = 0;
                    }
                }
            }

            // Сохраняем изменения
            await order.save();
            await userData.save();

            // Получаем актуальную информацию об уровне
            const currentLevel = getLevelByName(userData.level);

            return NextResponse.json({ 
                message: "Заказ создан",
                orderId: order._id.toString(),
                newBonusesString: userData.bonuses.toString(),
                newLevel: userData.level,
                newProgressString: userData.progress.toString()
            }, { status: 201 });

            /*
            */

        } catch (error) {
            console.error("Ошибка при обработке данных:", error);
            return NextResponse.json({ error: "Некорректный формат данных" }, { status: 400 });
        }

    } catch (error) {
        console.error("Ошибка сервера:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
