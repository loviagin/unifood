"use client";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaVk, FaYoutube, FaTelegram } from 'react-icons/fa';
import { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Ошибка при отправке email');
            }
            
            alert('Сообщение отправлено');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке сообщения');
        }
    };

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.container}>
                <h2 className={styles.title}>Свяжитесь с нами</h2>
                <div className={styles.content}>
                    <div className={styles.info}>
                        <a href="mailto:info@unifood.space" className={styles.contactItem}>
                            <FaEnvelope className={styles.icon} />
                            <div>
                                <h3>Email</h3>
                                <p>info@unifood.space</p>
                            </div>
                        </a>
                        <a href="tel:+74996008080" className={styles.contactItem}>
                            <FaPhone className={styles.icon} />
                            <div>
                                <h3>Телефон</h3>
                                <p>+7 (499) 600-80-80</p>
                            </div>
                        </a>
                        <a 
                            href="https://www.google.com/maps?q=RTU+MIREA" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.contactItem}
                        >
                            <FaMapMarkerAlt className={styles.icon} />
                            <div>
                                <h3>Адрес</h3>
                                <p>г. Москва, пр. Вернадского, 78</p>
                            </div>
                        </a>
                        <div className={styles.social}>
                            <a href="https://vk.com/mirea_official" target='_blank' className={styles.socialLink} aria-label="VK">
                                <FaVk />
                            </a>
                            <a href="https://www.youtube.com/channel/UClVZx_AWcLq8cXViG9NSXAA" target='_blank' className={styles.socialLink} aria-label="YouTube">
                                <FaYoutube />
                            </a>
                            <a href="http://telegram.me/rtumirea_official" target='_blank' className={styles.socialLink} aria-label="Telegram">
                                <FaTelegram />
                            </a>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ваше имя" 
                                    required 
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email" 
                                    required 
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Ваше сообщение" 
                                    required
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className={styles.submitBtn}
                                disabled={status.loading}
                            >
                                {status.loading ? 'Отправка...' : 'Отправить сообщение'}
                            </button>
                            {status.success && (
                                <p className={styles.successMessage}>
                                    Сообщение успешно отправлено!
                                </p>
                            )}
                            {status.error && (
                                <p className={styles.errorMessage}>
                                    {status.error}
                                </p>
                            )}
                        </form>
                    </div>
                    <div className={styles.map}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1453.994577102985!2d37.4793955489499!3d55.668972557158376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54dc1d23b51c3%3A0x74763ed59c81ccb6!2sRtu%20Mirea!5e0!3m2!1sen!2sse!4v1743407927593!5m2!1sen!2sse"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 