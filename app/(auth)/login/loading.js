import styles from '../Auth.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          Uni Food
          <div className={styles.plus}>+</div>
        </div>
      </div>

      <div className={styles.content}>
        <h1>Вход</h1>
        <p className={styles.subtitle}>Загрузка...</p>
        <div className={styles.loadingSpinner}></div>
      </div>
    </div>
  );
} 