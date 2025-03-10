//app/api/users/route.js
import { NextResponse } from "next/server";
import connectDB from "../db";
import User from "../../models/User";
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

        const { name, email, password, birthDate } = body;

        if (!name || !email || !password || !birthDate) {
            return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
        }

        const parsedBirthDate = new Date(birthDate);
        if (isNaN(parsedBirthDate)) {
            return NextResponse.json({ error: "Некорректная дата" }, { status: 400 });
        }

        // Проверяем, существует ли уже пользователь с таким email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 409 });
        }

        // Хешируем пароль перед сохранением
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём нового пользователя
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Сохранённый пароль теперь хеширован
            birthDate: parsedBirthDate
        });

        await newUser.save();

        return NextResponse.json({ message: "Пользователь создан", userId: newUser._id }, { status: 201 });
    } catch (error) {
        console.error("Ошибка:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

// export async function GET(request) {
//     await connectDB(); // Подключаемся к MongoDB

//     try {
//         // Получаем email и password из query params
//         const { searchParams } = new URL(request.url);
//         const email = searchParams.get("email");
//         const password = searchParams.get("password");

//         if (!email || !password) {
//             return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
//         }

//         // Ищем пользователя в базе
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
//         }

//         // Проверяем пароль (он должен быть хеширован при регистрации)
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
//         }

//         // Возвращаем ID найденного пользователя
//         return NextResponse.json({ message: "Пользователь найден", user: user }, { status: 200 });
//     } catch (error) {
//         console.error("Ошибка:", error);
//         return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
//     }
// }