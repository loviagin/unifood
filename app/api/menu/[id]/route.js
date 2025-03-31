import { NextResponse } from 'next/server';
import connectDB from '../../db';
import MenuItem from '../../../models/MenuItem';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    // Создаем объект с обновляемыми полями
    const updateFields = {};
    
    // Добавляем только те поля, которые были переданы
    if (body.name) updateFields.name = body.name;
    if (body.description) updateFields.description = body.description;
    if (body.price) updateFields.price = Number(body.price);
    if (body.image) updateFields.image = body.image;
    if (body.category) updateFields.category = body.category;

    // Проверяем, есть ли что обновлять
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: 'Нет полей для обновления' },
        { status: 400 }
      );
    }

    // Ищем и обновляем товар
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Возвращаем обновленный документ
    );

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Товар не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Товар успешно обновлен', item: updatedItem },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении товара' },
      { status: 500 }
    );
  }
} 