'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/Account.module.css';
import TabBar from '../../components/TabBar/TabBar';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const router = useRouter();

  const  handleLogout = ()  => {
    // Выход из аккаунта
    console.log('logout');
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                placeholder="Введите имя"
              />
            </div>
            <div className={styles.field}>
              <label>Дата рождения</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.field}>
              <label>Телефон</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditing}
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                placeholder="example@email.com"
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