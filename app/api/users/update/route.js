import { NextResponse } from 'next/server';
import connectDB from '@/app/api/db';


export async function PUT(request) {
  try {
    const { name, phone, email } = await request.json();
    
    await connectDB();
    
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { 
        name,
        phone,
        email,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Данные успешно обновлены',
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
} 