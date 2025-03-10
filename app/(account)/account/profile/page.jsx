'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Account.module.css';
import TabBar from '../../components/TabBar/TabBar';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    birthDate: '',
    phone: '',
    email: ''
  });

  const router = useRouter();

  useEffect(() => {
    // Получаем данные пользователя при загрузке
    const currentUser = localStorage.getItem('currentUser');

    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userPhone = localStorage.getItem('userPhone');
    const userBirthDate = localStorage.getItem('userBirthDate');

    if (currentUser) {
      setUserData({
        name: userName || '',
        birthDate: userBirthDate || '',
        phone: userPhone || '',
        email: userEmail || ''
      });
    } else {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userBirthDate');
    
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Профиль</h1>
        <button onClick={handleLogout} className={styles.button}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 12H3.62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Выйти
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Личные данные</h2>
          </div>

          <div className={styles.fields}>
            <div className={styles.field}>
              <label>Имя</label>
              <input
                type="text"
                value={userData.name}
                disabled
                placeholder="Не указано"
              />
            </div>
            <div className={styles.field}>
              <label>Дата рождения</label>
              <input
                type="date"
                value={userData.birthDate}
                disabled
                placeholder="Не указано"
              />
            </div>
            <div className={styles.field}>
              <label>Телефон</label>
              <input
                type="tel"
                value={userData.phone}
                disabled
                placeholder="Не указано"
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                value={userData.email}
                disabled
                placeholder="Не указано"
              />
            </div>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default Profile;