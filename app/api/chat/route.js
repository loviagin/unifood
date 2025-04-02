import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export async function POST(request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        console.log('Using API Key:', GEMINI_API_KEY ? 'API key is set' : 'API key is missing');

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });
            throw new Error(`Failed to fetch from Gemini API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        return NextResponse.json({ response: aiResponse });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
} 