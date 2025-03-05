'use client';
import styles from './Registration.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { app, auth } from '../../../firebase/firebase';
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

  const formatPhoneNumber = (phone) => {
    // Убираем все нецифровые символы
    const cleaned = phone.replace(/\D/g, '');
    // Добавляем +7 если номер начинается с 8 или 7
    if (cleaned.startsWith('8') || cleaned.startsWith('7')) {
      return '+7' + cleaned.slice(1);
    }
    // Если номер начинается с других цифр, добавляем +7
    return cleaned ? '+7' + cleaned : '';
  };

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

    try {
      // Форматируем номер телефона
      let formattedPhone = phone.replace(/[^\d]/g, '');
      if (formattedPhone.startsWith('8')) {
        formattedPhone = '7' + formattedPhone.slice(1);
      } else if (!formattedPhone.startsWith('7')) {
        formattedPhone = '7' + formattedPhone;
      }
      formattedPhone = '+' + formattedPhone;

      if (formattedPhone.length !== 12) {
        setError('Введите корректный номер телефона');
        return;
      }

      // Создаем новый reCAPTCHA каждый раз
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: async (response) => {
          try {
            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, verifier);
            setVerificationId(confirmationResult);
            setIsCodeSent(true);
            setError('');
          } catch (error) {
            console.error('SMS Error:', error);
            setError('Ошибка при отправке кода. Попробуйте снова.');
          }
        },
        'expired-callback': () => {
          setError('Время истекло. Попробуйте снова.');
          verifier.clear();
        }
      });

      // Рендерим капчу
      await verifier.render();
      
    } catch (error) {
      console.error('SMS Error:', error);
      setError('Ошибка при отправке кода. Попробуйте снова.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !birthDate) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      if (authType === 'email') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createUserDocument(userCredential.user.uid, {
          name,
          birthDate,
          email,
          phone: '',
          authType: 'email'
        });
      } else if (authType === 'phone' && verificationId) {
        const credential = PhoneAuthProvider.credential(verificationId, smsCode);
        const userCredential = await auth.signInWithCredential(credential);
        await createUserDocument(userCredential.user.uid, {
          name,
          birthDate,
          email: '',
          phone,
          authType: 'phone'
        });
      }

      router.push('/account');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Ошибка при регистрации. Попробуйте снова.');
    }
  };

  const createUserDocument = async (userId, userData) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
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

        <form onSubmit={authType === 'phone' && !isCodeSent ? handleSendCode : handleSubmit} className={styles.form}>
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

          <button type="submit" className={styles.submitButton}>
            {authType === 'phone'
              ? (isCodeSent ? 'Подтвердить' : 'Получить код')
              : 'Создать аккаунт'}
          </button>
        </form>

        <div className={styles.loginLink}>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </div>
      </div>
      <div id="recaptcha-container" className={styles.recaptchaContainer}></div>
    </div>
  );
}

// Компонент для кастомного инпута
const input = React.forwardRef((props, ref) => (
  <input {...props} ref={ref} className={styles.input} />
));
input.displayName = 'Input';

export default Registration;