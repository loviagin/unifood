import { NextResponse } from 'next/server';
import connectDB from '../db';
import MenuItem from '../../models/MenuItem';

export async function GET() {
  try {
    await connectDB();
    const menuItems = await MenuItem.find().sort({ createdAt: -1 });
    return NextResponse.json({ menu: menuItems });
  } catch (error) {
    console.error('Ошибка при получении меню:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении меню' },
      { status: 500 }
    );
  }
} 