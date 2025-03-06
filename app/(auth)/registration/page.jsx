'use client';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PatternFormat } from 'react-number-format';
import React from 'react';

const Registration = () => {
  const [authType, setAuthType] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
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
      // Получаем существующих пользователей
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Проверяем существование пользователя
      const existingUser = users.find(user => 
        (authType === 'email' && user.email === email) || 
        (authType === 'phone' && user.phone === phone)
      );

      if (existingUser) {
        setError('Пользователь с таким ' + (authType === 'email' ? 'email' : 'телефоном') + ' уже существует');
        return;
      }

      // Создаем нового пользователя
      const newUser = {
        id: Date.now(),
        name,
        birthDate,
        password,
        bonuses: 0,
        level: 'Новичок',
        nextLevel: 1000,
        progress: 0,
        ...(authType === 'email' ? { email } : { phone })
      };

      // Сохраняем пользователя
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Устанавливаем текущего пользователя
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      router.push('/account');
    } catch (err) {
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
              type="text"
              placeholder="Дата рождения"
              value={birthDate}
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.type = 'text';
                }
              }}
              onChange={(e) => setBirthDate(e.target.value)}
              required
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

          <button type="submit" className={styles.submitButton}>
            Создать аккаунт
          </button>
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