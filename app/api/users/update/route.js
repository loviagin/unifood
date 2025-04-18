import { NextResponse } from 'next/server';
import connectDB from '@/app/api/db';

const JWT_SECRET = process.env.JWT_SECRET

function verifyToken(req) {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false

    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, JWT_SECRET)
        return true
    } catch {
        return false
    }
}

export async function PUT(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Требуется авторизация' }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: 'Недействительный токен' }, { status: 401 });
    }

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