import { NextResponse } from "next/server";
import connectDB from "@/app/api/db";
import User from "@/app/api/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
    await connectDB(); // Подключаемся к MongoDB

    try {
        // Читаем JSON из тела запроса
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

        // Ищем пользователя по email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
        }

        // Проверяем пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
        }

        // Возвращаем ID пользователя (без пароля)
        return NextResponse.json({ 
            message: "Успешный вход", 
            user: user
        }, { status: 200 });

    } catch (error) {
        console.error("Ошибка:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}