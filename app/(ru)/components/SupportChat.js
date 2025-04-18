'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './SupportChat.module.css';
import { IoMdClose } from 'react-icons/io';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

const SupportChat = ({ isOpenExternal, onCloseExternal, hideButton = false }) => {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof isOpenExternal !== 'undefined' && mounted) {
            setIsOpen(isOpenExternal);
        }
    }, [isOpenExternal, mounted]);

    const handleClose = () => {
        if (onCloseExternal) {
            onCloseExternal();
        }
        setIsOpen(false);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (mounted) {
            scrollToBottom();
        }
    }, [messages, mounted]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            text: inputMessage,
            type: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputMessage }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            const aiMessage = {
                text: data.response,
                type: 'ai'
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                text: 'Извините, произошла ошибка. Попробуйте позже.',
                type: 'ai'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <>
            {!hideButton && (
                <button 
                    className={styles.chatButton}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open support chat"
                >
                    <IoChatbubbleEllipsesOutline />
                </button>
            )}

            {(isOpen || isOpenExternal) && (
                <div className={styles.chatModal}>
                    <div className={styles.chatHeader}>
                        <h3>Поддержка</h3>
                        <button 
                            className={styles.closeButton}
                            onClick={handleClose}
                            aria-label="Close chat"
                        >
                            <IoMdClose />
                        </button>
                    </div>

                    <div className={styles.messagesContainer}>
                        {messages.map((message, index) => (
                            <div 
                                key={index}
                                className={`${styles.message} ${
                                    message.type === 'user' ? styles.userMessage : styles.aiMessage
                                }`}
                            >
                                {message.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            className={styles.input}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Введите сообщение..."
                            disabled={isLoading}
                        />
                        <button 
                            className={styles.sendButton}
                            onClick={handleSendMessage}
                            disabled={isLoading}
                        >
                            {isLoading ? '...' : 'Отправить'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SupportChat; 