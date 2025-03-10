//app/api/users/route.js
import { NextResponse } from "next/server";
import connectDB from "../db";
import User from "../../models/User";

export async function POST(request) {
    await connectDB(); // Подключаемся к MongoDB

    try {
        const contentType = request.headers.get("content-type");

        let body;
        if (contentType.includes("application/json")) {
            body = await request.json(); // ✅ Если JSON
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            body = Object.fromEntries(formData); // ✅ Если form-data
        } else {
            return NextResponse.json({ error: "Unsupported Content-Type" }, { status: 400 });
        }

        const { name, email, password, birthDate } = body;

        if (!name || !email || !password || !birthDate) {
            return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

        // ✅ Парсим дату рождения в формат Date
        const parsedBirthDate = new Date(birthDate);
        if (isNaN(parsedBirthDate)) {
            return NextResponse.json({ error: "Некорректная дата" }, { status: 400 });
        }

        // ✅ Создаём пользователя (MongoDB сам создаст `_id`)
        const newUser = new User({ name, email, password, birthDate: parsedBirthDate });
        await newUser.save();

        return NextResponse.json({ message: "Пользователь создан", user: newUser }, { status: 201 });
    } catch (error) {
        console.error("Ошибка:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

export async function GET(request) {
    await connectDB(); // Подключаемся к MongoDB

    try {
        // const { name, email, password, birthdate } = await request.json();

        // if (!name || !email || !password || !birthdate) {
        //     return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        // }

        // const newUser = new User({ name, email, password, birthdate });
        // await newUser.save();

        console.log("GET");

        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error) {
        console.error("Ошибка:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}