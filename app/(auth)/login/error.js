'use client';

import { useEffect } from 'react';
import styles from '../Auth.module.css';

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <h2>Что-то пошло не так!</h2>
      <button
        className={styles.submitButton}
        onClick={() => reset()}
      >
        Попробовать снова
      </button>
    </div>
  );
} 