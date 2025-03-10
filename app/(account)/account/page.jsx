'use client';
import styles from '../styles/Account.module.css';
import TabBar from '../components/TabBar/TabBar';
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useRouter } from 'next/navigation';

const Account = () => {
  const [bonuses, setBonuses] = useState(0);
  const [level, setLevel] = useState('Новичок');
  const [nextLevel, setNextLevel] = useState(1000);
  const [progress, setProgress] = useState(0);
  const [qrValue, setQrValue] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("currentUser");
      if (!userId) {
        router.push("/login");
        return;
      }

      try {
        console.log("Загружаем данные для пользователя с ID:", userId);
        
        const response = await fetch(`/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Статус ответа:", response.status); // 🔍 Логируем код ошибки

        if (!response.ok) throw new Error("Ошибка загрузки данных");

        const data = await response.json();
        setBonuses(data.bonuses);
        setLevel(data.level);
        setNextLevel(data.nextLevel);
        setProgress(data.progress);
        setQrValue(userId);
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
      }
    };

    fetchUserData();
  }, []);

  // Для отладки
  useEffect(() => {
    console.log('Current QR Value:', qrValue);
  }, [qrValue]);

  // Демо-данные для истории
  const history = [
    {
      id: 1,
      date: '12 марта 2024',
      title: 'нач',
      details: 'Капучино x2, Круассан',
      amount: 50,
      bonus: 50,
      type: 'earn'
    }
  ];

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Главная</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.bonuses}>
              <span className={styles.bonusesAmount}>{bonuses}</span>
              <span className={styles.bonusesLabel}>бонусов</span>
            </div>
            <div className={styles.level}>
              <span className={styles.currentLevel}>{level}</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={styles.nextLevel}>
                До следующего уровня {nextLevel - bonuses} ₽
              </span>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.qrContainer}>
              <div className={styles.qrCode}>
                {qrValue ? (
                  <QRCodeSVG
                    value={qrValue}
                    size={232}
                    level="H"
                    includeMargin={true}
                    className={styles.qrCodeSvg}
                    fgColor="#B90778"
                    bgColor="transparent"
                  />
                ) : (
                  <div className={styles.qrLoading}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <span className={styles.qrLabel}>
                Покажите QR-код на кассе для списания бонусов
              </span>
            </div>
          </div>
        </div>

        <div className={styles.infoCards}>
          <div className={styles.infoRow}>
            <div className={styles.card}>
              <button
                className={`${styles.accordion} ${expandedSection === 'earn' ? styles.expanded : ''}`}
                onClick={() => toggleSection('earn')}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.9945 16H12.0035" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Как копить бонусы?</h3>
                </div>
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none">
                  <path d="M19 8.5L12 15.5L5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`${styles.accordionContent} ${expandedSection === 'earn' ? styles.expanded : ''}`}>
                <p>Оплачивайте заказы и получайте до 7% бонусами</p>
              </div>
            </div>
            {/* пишем div */}
            <div className={styles.card}>
              <button
                className={`${styles.accordion} ${expandedSection === 'spend' ? styles.expanded : ''}`}
                onClick={() => toggleSection('spend')}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Как потратить бонусы?</h3>
                </div>
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none">
                  <path d="M19 8.5L12 15.5L5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`${styles.accordionContent} ${expandedSection === 'spend' ? styles.expanded : ''}`}>
                <p>Оплачивайте до 50% стоимости заказа бонусами</p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>История покупок</h2>
            </div>
            <div className={styles.history}>
              {history.map(item => (
                <div key={item.id} className={styles.historyItem}>
                  <div className={styles.historyInfo}>
                    <div className={styles.historyDate}>{item.date}</div>
                    <div className={styles.historyTitle}>{item.title}</div>
                    <div className={styles.historyDetails}>{item.details}</div>
                    <div className={`${styles.historyBonus} ${item.bonus < 0 ? styles.spent : ''}`}>
                      {item.bonus > 0 ? `+${item.bonus} баллов` : `Списано ${Math.abs(item.bonus)} баллов`}
                    </div>
                  </div>
                  <div className={`${styles.historyAmount} ${item.bonus < 0 ? styles.spent : ''}`}>
                    {item.bonus > 0 ? '+' : '-'}{item.amount} ₽
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default Account;