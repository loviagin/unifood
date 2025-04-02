import { NextResponse } from 'next/server';
import connectDB from '@/app/api/db';
import User from '@/app/models/User'; // Changed from named import to default import

export async function PUT(request) {
  try {
    const { name, phone, email, userId } = await request.json(); // Добавлен userId

    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId, // Используем userId, а не несуществующий decoded.userId
      { name, phone, email, updatedAt: new Date() },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Данные успешно обновлены',
      user: { name: user.name, phone: user.phone, email: user.email }
    });
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}