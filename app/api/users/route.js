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

        const newUserData = new UserData({
            userId: newUser._id,
            bonuses: 50,
            level: "Новичок",
            nextLevel: 1000,
            progress: 10
        });

        await newUser.save();
        await newUserData.save();

        return NextResponse.json({ message: "Пользователь создан", userId: newUser._id }, { status: 201 });
    } catch (error) {
        console.error("Ошибка:", error);
        return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }
}


// export async function GET(request) {
//     await connectDB();

//     try {
//         const { searchParams } = new URL(request.url);
//         const userId = searchParams.get('userId');
//         console.log("🔍 Запрашиваемый userId:", userId);

//         if (!userId) {
//             return NextResponse.json({ error: "userId обязателен" }, { status: 400 });
//         }

//         try {
//             const userData = await UserData.findOne({ 
//                 userId: new mongoose.Types.ObjectId(userId) 
//             });
//             console.log("🔍 Найденные данные:", userData);

//             if (!userData) {
//                 return NextResponse.json({ error: "Данные пользователя не найдены" }, { status: 404 });
//             }

//             return NextResponse.json({
//                 bonuses: userData.bonuses,
//                 level: userData.level,
//                 nextLevel: userData.nextLevel,
//                 progress: userData.progress
//             }, { status: 200 });

//         } catch (error) {
//             console.error("Ошибка при обработке userId:", error);
//             return NextResponse.json({ error: "Некорректный формат userId" }, { status: 400 });
//         }

//     } catch (error) {
//         console.error("Ошибка при загрузке данных пользователя:", error);
//         return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
//     }
// }