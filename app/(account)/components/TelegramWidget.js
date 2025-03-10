'use client';

import { useEffect } from 'react';

export default function TelegramWidget() {
    useEffect(() => {
        // Добавляем скрипт Telegram
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.setAttribute('data-telegram-discussion', 'unifood_support'); // Замените на ваш username канала
        script.setAttribute('data-comments-limit', '5');
        document.body.appendChild(script);

        return () => {
            // Удаляем скрипт при размонтировании компонента
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <div id="telegram-discussion"></div>
            <iframe src="https://web.telegram.org/k/#@unifood_support_bot" width="400" height="600"></iframe>
        </>
    );
} 