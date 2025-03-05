'use client';
import styles from './Registration.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import firebase from '../../../firebase/firebase';

const Registration = () => {
  const [authType, setAuthType] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();

  const auth = getAuth(firebase);
  const db = getFirestore(firebase);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.push('/account');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const auth = getAuth(firebase);
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // Callback после успешной верификации
      },
      'expired-callback': () => {
        // Callback при истечении срока действия
        setError('Время истекло. Попробуйте снова.');
      }
    });

    // Очистка при размонтировании
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const handleSendCode = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebase);

    try {
      // Форматируем номер телефона
      let formattedPhone = phone;
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = `+7${phone.replace(/\D/g, '')}`;
      }

      // Проверяем формат номера
      if (formattedPhone.length < 12) {
        setError('Введите корректный номер телефона');
        return;
      }

      // Отправляем SMS
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setVerificationId(confirmationResult);
      setIsCodeSent(true);
      setError('');
    } catch (error) {
      console.error('SMS Error:', error);
      setError('Ошибка при отправке кода. Попробуйте снова.');

      // Сбрасываем reCAPTCHA при ошибке
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible'
        });
      }
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
        router.push('/account');
      } else if (authType === 'phone' && verificationId) {
        const result = await verificationId.confirm(smsCode);
        await createUserDocument(result.user.uid, {
          name,
          birthDate,
          email: '',
          phone,
          authType: 'phone'
        });
        router.push('/account');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Ошибка при регистрации. Попробуйте снова.');
    }
  };

  const handleAuthTypeChange = (type) => {
    setAuthType(type);
    setError('');
    setIsCodeSent(false);
    setVerificationId(null);
    setSmsCode('');
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
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isCodeSent}
                  required
                />
              </div>
              {isCodeSent && (
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Введите код из SMS"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
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

export default Registration;