import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Email from '@/app/(root)/components/email/email';
import { render } from '@react-email/render';
import * as React from 'react';
import jwt from 'jsonwebtoken'

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

export async function POST(req) {
    if (!verifyToken(req)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    const { name, email, message } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);
    const html = await render(React.createElement(Email, { name, email, message }));

    try {
        const data = await resend.emails.send({
            from: 'noreply@lovigin.com',
            to: 'ilia.loviagin@gmail.com',
            subject: 'Новое сообщение с сайта Uni food +',
            html,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}