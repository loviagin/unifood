//app/api/users/route.js
import { NextResponse } from "next/server";
import connectDB from "../db";
import User from "../../models/User";

export async function POST(request) {
    await connectDB(); // Подключаемся к MongoDB

    try {
        const { name, email, password, birthdate } = await request.json();

        if (!name || !email || !password || !birthdate) {
            return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

        const newUser = new User({ name, email, password, birthdate });
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