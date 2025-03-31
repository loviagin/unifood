'use client';
import { useState, useEffect } from 'react';
import styles from './Menu.module.css';
import TabBar from '../../components/TabBar/TabBar';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error('Ошибка загрузки меню');
        }
        const data = await response.json();
        setMenuItems(data.menu);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Меню</h1>
        </div>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка меню...</p>
        </div>
        <TabBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Меню</h1>
        </div>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
        <TabBar />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Меню</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.menuGrid}>
          {menuItems.map((item) => (
            <div key={item._id} className={styles.menuItem}>
              <div className={styles.menuItemImage}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles.menuItemInfo}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className={styles.menuItemPrice}>
                  <span>{item.price} ₽</span>
                  <button className={styles.addButton}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar />
    </div>
  );
};

export default Menu; 