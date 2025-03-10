import { NextResponse } from "next/server";

export async function GET(request) {
  // Получаем параметры из URL
  const { pathname } = request.nextUrl;
  const id = pathname.split("/"); // Извлекаем username из URL

  if (!id) {
    return new NextResponse("Username not found", { status: 400 });
  }

  // Возвращаем редирект
  return new NextResponse("Status correct" + id, { status: 200 });
}
