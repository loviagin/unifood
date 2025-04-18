import Link from 'next/link';
import styles from './CTA.module.css';
import Image from 'next/image';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Копите</span> бонусы с каждой покупки
          </h2>
          <p className={styles.description}>
            Присоединяйтесь к программе лояльности UniFood+ и получайте до 7% кешбэка
            за каждую покупку в столовых РТУ МИРЭА
          </p>
          <div className={styles.buttons}>
            <Link href={'/registration'} className={styles.primaryButton}>
              Получить QR-код
              <span className={styles.arrow}>→</span>
            </Link>
            <Link href={'/#more'} className={styles.secondaryButton}>
              О программе
            </Link>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.imageOverlay}></div>
          <div className={styles.qrPreview}>
            <div className={styles.qrContainer}>
              <div className={styles.qrCode}>
                <div className={styles.qrCorner}></div>
                <div className={styles.qrCorner}></div>
                <div className={styles.qrCorner}></div>
                <div className={styles.qrPatterns}>
                  <div className={styles.qrPattern}></div>
                  <div className={styles.qrPattern}></div>
                  <div className={styles.qrPattern}></div>
                  <div className={styles.qrPattern}></div>
                  <div className={styles.qrPattern}></div>
                  <div className={styles.qrPattern}></div>
                  <div className={styles.qrPattern}></div>
                  <div className={styles.qrPattern}></div>
                </div>
                <div className={styles.qrLogo}>
                  <div className={styles.logoCircle}></div>
                  <div className={styles.logoText}>UF</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>7%</span>
              <span className={styles.statLabel}>Максимальный кешбэк</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50%</span>
              <span className={styles.statLabel}>Оплата бонусами</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 