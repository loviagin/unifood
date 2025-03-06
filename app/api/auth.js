import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase/firebase';

export const sendVerificationCode = async ({ phone }, onSuccess, onError) => {
  try {
    let formattedPhone = phone.replace(/[^\d]/g, '');
    if (formattedPhone.startsWith('8')) {
      formattedPhone = '7' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('7')) {
      formattedPhone = '7' + formattedPhone;
    }
    formattedPhone = '+' + formattedPhone;

    if (formattedPhone.length !== 12) {
      throw new Error('Введите корректный номер телефона');
    }

    // Создаем видимую reCAPTCHA
    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'normal',
      callback: async () => {
        try {
          // После успешного решения капчи отправляем SMS
          const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
          onSuccess(confirmationResult);
        } catch (error) {
          onError('Ошибка при отправке кода. Попробуйте снова.');
          appVerifier.clear();
        }
      },
      'expired-callback': () => {
        onError('Время истекло. Попробуйте снова.');
        appVerifier.clear();
      }
    });

    // Рендерим капчу
    await appVerifier.render();

  } catch (error) {
    console.error('Phone verification error:', error);
    onError('Ошибка при отправке кода. Попробуйте снова.');
  }
};

export const registerUser = async (authType, userData) => {
  let userCredential = null;

  try {
    console.log('Начало регистрации:', { authType, ...userData });

    // Регистрация пользователя
    if (authType === 'email') {
      userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    } else if (authType === 'phone' && userData.verificationId) {
      console.log('Phone auth - до подтверждения');
      const confirmationResult = userData.verificationId;
      userCredential = await confirmationResult.confirm(userData.smsCode);
      console.log('Phone auth - после подтверждения:', userCredential);
    } else {
      throw new Error('Неверный тип аутентификации или проверочный код');
    }

    const user = userCredential.user;
    console.log('Пользователь создан:', user.uid);

    // Создание документа пользователя в Firestore
    await createUserDocument(user.uid, {
      name: userData.name || '',
      birthDate: userData.birthDate || '',
      email: authType === 'email' ? userData.email : '',
      phone: authType === 'phone' ? userData.phone : '',
      authType,
      uid: user.uid
    });

    console.log('Документ успешно создан');
    return user;

  } catch (error) {
    console.error('Ошибка при регистрации:', error);

    // Если аккаунт создан, но Firestore документ не создался, удаляем аккаунт
    if (userCredential?.user) {
      try {
        await userCredential.user.delete();
        console.log('Удален незавершенный аккаунт');
      } catch (deleteError) {
        console.error('Ошибка удаления пользователя:', deleteError);
      }
    }

    await auth.signOut();
    throw error;
  }
};

const createUserDocument = async (userId, userData) => {
  console.log('Создание документа в Firestore для пользователя:', userId);

  try {
    // Убираем проверку `auth.currentUser`, она не нужна
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    });

    console.log('Документ в Firestore успешно создан');
    return true;
  } catch (error) {
    console.error('Ошибка при создании документа Firestore:', error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Email login error:', error);
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('Пользователь с таким email не найден');
      case 'auth/wrong-password':
        throw new Error('Неверный пароль');
      case 'auth/invalid-email':
        throw new Error('Некорректный email');
      default:
        throw new Error('Ошибка при входе. Попробуйте снова.');
    }
  }
};

export const loginWithPhone = async ({ phone }, onSuccess, onError) => {
  try {
    let formattedPhone = phone.replace(/[^\d]/g, '');
    if (formattedPhone.startsWith('8')) {
      formattedPhone = '7' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('7')) {
      formattedPhone = '7' + formattedPhone;
    }
    formattedPhone = '+' + formattedPhone;

    if (formattedPhone.length !== 12) {
      throw new Error('Введите корректный номер телефона');
    }

    // Создаем видимую reCAPTCHA
    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'normal',
      callback: async () => {
        try {
          const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
          onSuccess(confirmationResult);
        } catch (error) {
          onError('Ошибка при отправке кода. Попробуйте снова.');
          appVerifier.clear();
        }
      },
      'expired-callback': () => {
        onError('Время истекло. Попробуйте снова.');
        appVerifier.clear();
      }
    });

    await appVerifier.render();

  } catch (error) {
    console.error('Phone login error:', error);
    onError('Ошибка при входе. Попробуйте снова.');
  }
}; 