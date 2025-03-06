'use client';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PatternFormat } from 'react-number-format';
import { auth } from '../../firebase/firebase';
import React from 'react';
import { loginWithEmail, loginWithPhone } from '../../api/auth';

const Login = () => {
  const [authType, setAuthType] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [smsCode, setSmsCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/account');
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePhoneChange = (values) => {
    const { value } = values;
    setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (authType === 'phone') {
        if (!isCodeSent) {
          // Отправка кода подтверждения
          await loginWithPhone(
            { phone },
            (confirmationResult) => {
              setVerificationId(confirmationResult);
              setIsCodeSent(true);
              setError('');
            },
            (errorMessage) => {
              setError(errorMessage);
            }
          );
        } else {
          // Подтверждение кода
          const user = await verificationId.confirm(smsCode);
          if (user) {
            router.push('/account');
          } else {
            throw new Error('Ошибка при входе');
          }
        }
      } else {
        // Вход по email
        if (!email || !password) {
          setError('Пожалуйста, заполните все поля');
          return;
        }

        const user = await loginWithEmail(email, password);
        if (user) {
          router.push('/account');
        } else {
          throw new Error('Ошибка при входе');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Ошибка при входе. Проверьте данные и попробуйте снова.');
    }
  };

  const handleAuthTypeChange = (type) => {
    setAuthType(type);
    setError('');
    setEmail('');
    setPhone('');
    setSmsCode('');
    setIsCodeSent(false);
    setVerificationId(null);
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
        <p className={styles.subtitle}>Войдите в аккаунт, чтобы получать бонусы</p>

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
                  disabled={isCodeSent}
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
              {isCodeSent && (
                <div className={styles.inputGroup}>
                  <PatternFormat
                    format="######"
                    mask="_"
                    value={smsCode}
                    onValueChange={({ value }) => setSmsCode(value)}
                    customInput={input}
                    placeholder="Введите код из SMS"
                    required
                  />
                </div>
              )}
            </>
          )}

          {error && <div className={styles.error}>{error}</div>}

          {authType === 'phone' && !isCodeSent && (
            <div id="recaptcha-container" className={styles.recaptchaContainer}></div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
          >
            {authType === 'phone' 
              ? (isCodeSent ? 'Войти' : 'Получить код')
              : 'Войти'
            }
          </button>
        </form>

        <div className={styles.authLink}>
          <span>Нет аккаунта?</span>
          <Link href="/registration">Создать</Link>
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