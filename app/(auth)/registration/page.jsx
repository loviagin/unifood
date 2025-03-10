'use client';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PatternFormat } from 'react-number-format';
import React from 'react';
import { randomUUID } from 'crypto';

const Registration = () => {
  const [authType, setAuthType] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [error, setError] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Проверяем авторизацию при загрузке
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      router.push('/account');
    }
  }, []);

  const handlePhoneChange = ({ value }) => {
    setPhone(value);
  };

  const handleAuthTypeChange = (type) => {
    setAuthType(type);
    setError('');
    setEmail('');
    setPhone('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Создаем нового пользователя
      const newUser = {
        name,
        birthDate,
        password,
        email: authType === 'email' ? email : undefined,
        phone: authType === 'phone' ? phone : undefined
      };

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        setError('Ошибка при регистрации');
        return;
      }

      const data = await response.json();
      console.log(data);

      // Сохраняем id пользователя, если он есть
      if (data.user && data.user._id) {
        localStorage.setItem('currentUser', JSON.stringify(data.user._id));
      }

      router.push('/account');
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      setError('Ошибка при регистрации');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          Uni Food
          <div className={styles.plus}>+</div>
        </Link>
      </div>

      <div className={styles.content}>
        <h1>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт, чтобы получать бонусы</p>

        <div className={styles.authTypeSwitch}>
          <button
            className={`${styles.authTypeButton} ${authType === 'email' ? styles.active : ''}`}
            onClick={() => handleAuthTypeChange('email')}
            type="button"
          >
            Email
          </button>
          <button
            className={`${styles.authTypeButton} ${authType === 'phone' ? styles.active : ''}`}
            onClick={() => handleAuthTypeChange('phone')}
            type="button"
          >
            Телефон
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="date"
              placeholder="Дата рождения"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className={!birthDate ? styles.empty : ''}
              min="1900-01-01"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {authType === 'email' ? (
            <>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.inputGroup}>
                <PatternFormat
                  format="+7 (###) ###-##-##"
                  mask="_"
                  value={phone}
                  onValueChange={handlePhoneChange}
                  customInput={input}
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {error && <div className={styles.error}>{error}</div>}

          {authType === 'email' ? (
            <button type="submit" className={styles.submitButton}>
              Создать аккаунт
            </button>
          ) : (
            <p className={styles.notAvailable}>Данный метод регистрации в разработке</p>
          )}

        </form>

        <div className={styles.authLink}>
          <span>Уже есть аккаунт?</span>
          <Link href="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
}

// Компонент для кастомного инпута
const input = React.forwardRef((props, ref) => (
  <input {...props} ref={ref} className={styles.input} />
));
input.displayName = 'Input';

export default Registration;