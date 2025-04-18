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
      router.push('/en/account');
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
      // POST-запрос с email и password
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: authType === 'email' ? email : '',
          password
        })
      });

      // Обрабатываем ошибки
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Error logging in');
        return;
      }

      // Получаем данные пользователя
      const data = await response.json();

      // Сохраняем id пользователя
      if (data.user) {
        localStorage.setItem('currentUser', data.user._id.replace(/"/g, ""));
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        // localStorage.setItem('userPhone', data.user.phone);
        localStorage.setItem('userBirthDate', data.user.birthDate);

        router.push('/en/account');
      } else {
        setError('Error logging in');
      }
    } catch (err) {
      setError('Error logging in');
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
        <h1>Login</h1>
        <p className={styles.subtitle}>Login to get bonuses</p>

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
            Phone
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          {authType === 'email' ? (
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          ) : (
            <p className={styles.notAvailable}>This login method is under development</p>
          )}

        </form>

        <div className={styles.authLink}>
          <span>No account?</span>
          <Link href="/en/registration">Register</Link>
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