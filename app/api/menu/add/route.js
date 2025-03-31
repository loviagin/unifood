import { NextResponse } from 'next/server';
import connectDB from '../../db';
import MenuItem from '../../../models/MenuItem';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Проверяем обязательные поля
    if (!body.name || !body.description || !body.price || !body.image || !body.category) {
      return NextResponse.json(
        { error: 'Все поля обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Создаем новый товар
    const newMenuItem = await MenuItem.create({
      name: body.name,
      description: body.description,
      price: Number(body.price),
      image: body.image,
      category: body.category
    });

    return NextResponse.json(
      { message: 'Товар успешно добавлен', item: newMenuItem },
      { status: 201 }
    );

  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    return NextResponse.json(
      { error: 'Ошибка при добавлении товара' },
      { status: 500 }
    );
  }
} 