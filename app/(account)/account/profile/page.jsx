'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Account.module.css';
import TabBar from '../../components/TabBar/TabBar';
import TelegramWidget from '../../components/TelegramWidget';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    birthDate: '',
    phone: '',
    email: ''
  });
  const [isSupportOpen, setIsSupportOpen] = useState(false);

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
            {/* <div className={styles.field}>
              <label>Дата рождения</label>
              <input
                type="date"
                value={userData.birthDate}
                disabled
                placeholder="Не указано"
              />
            </div> */}
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

        <button 
          className={styles.supportButton}
          onClick={() => setIsSupportOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Поддержка
        </button>

        {isSupportOpen && (
          <div className={styles.supportOverlay} onClick={(e) => {
            if (e.target === e.currentTarget) setIsSupportOpen(false);
          }}>
            <div className={styles.supportModal}>
              <div className={styles.supportHeader}>
                <h3>Чат с поддержкой</h3>
                <button 
                  className={styles.closeButton}
                  onClick={() => setIsSupportOpen(false)}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className={styles.supportContent}>
                <TelegramWidget />
              </div>
            </div>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
};

export default Profile;