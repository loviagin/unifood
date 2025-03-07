'use client';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PatternFormat } from 'react-number-format';
import React from 'react';

const Login = () => {
  const [authType, setAuthType] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
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
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Получаем пользователей
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Ищем пользователя
      const user = users.find(user => 
        ((authType === 'email' && user.email === email) || 
         (authType === 'phone' && user.phone === phone)) && 
        user.password === password
      );

      if (!user) {
        setError('Неверный ' + (authType === 'email' ? 'email' : 'телефон') + ' или пароль');
        return;
      }

      // Устанавливаем текущего пользователя
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push('/account');
    } catch (err) {
      setError('Ошибка при входе');
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
        <h1>Вход</h1>
        <p className={styles.subtitle}>Войдите, чтобы получать бонусы</p>

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
          {authType === 'email' ? (
            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          ) : (
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
          )}

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>

        <div className={styles.authLink}>
          <span>Нет аккаунта?</span>
          <Link href="/registration">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}

const input = React.forwardRef((props, ref) => (
  <input {...props} ref={ref} className={styles.input} />
));
input.displayName = 'Input';

export default Login;