'use client';
import styles from '../Auth.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { PatternFormat } from 'react-number-format';
import { app, auth } from '../../firebase/firebase';
import { sendVerificationCode, registerUser } from '../../api/auth';
import React from 'react';

const Registration = () => {
  const [authType, setAuthType] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [smsCode, setSmsCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();

  const db = getFirestore(app);

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

  const handleSendCode = async (e) => {
    e.preventDefault();
    
    if (!name || !birthDate) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    await sendVerificationCode(
      { phone, name, birthDate },
      (confirmationResult) => {
        setVerificationId(confirmationResult);
        setIsCodeSent(true);
        setError('');
      },
      (errorMessage) => {
        setError(errorMessage);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !birthDate) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      if (authType === 'phone' && !isCodeSent) {
        console.log('Sending verification code...');
        await sendVerificationCode(
          { phone },
          (confirmationResult) => {
            console.log('Code sent successfully');
            setVerificationId(confirmationResult);
            setIsCodeSent(true);
            setError('');
          },
          (errorMessage) => {
            console.error('Code sending failed:', errorMessage);
            setError(errorMessage);
          }
        );
      } else {
        console.log('Starting registration with:', {
          authType,
          hasVerificationId: !!verificationId,
          smsCode,
          phone
        });

        const user = await registerUser(authType, {
          email,
          password,
          phone,
          name,
          birthDate,
          verificationId,
          smsCode
        });

        console.log('Registration successful:', user);

        if (user) {
          const currentUser = auth.currentUser;
          console.log('Current user check:', {
            hasCurrentUser: !!currentUser,
            currentUid: currentUser?.uid,
            expectedUid: user.uid
          });

          if (currentUser && currentUser.uid === user.uid) {
            router.push('/account');
          } else {
            throw new Error('User not authenticated after registration');
          }
        } else {
          throw new Error('Registration failed');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Ошибка при регистрации. Попробуйте снова.');
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

          {/* Контейнер для капчи */}
          {authType === 'phone' && !isCodeSent && (
            <div id="recaptcha-container" className={styles.recaptchaContainer}></div>
          )}

          <button 
            id="sign-in-button" 
            type="submit" 
            className={styles.submitButton}
          >
            {authType === 'phone' 
              ? (isCodeSent ? 'Подтвердить' : 'Получить код')
              : 'Создать аккаунт'
            }
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