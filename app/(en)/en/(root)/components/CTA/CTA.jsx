import Link from 'next/link';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Accumulate</span> bonuses with each purchase
          </h2>
          <p className={styles.description}>
            Join the UniFood+ loyalty program and get up to 7% cashback
            for each purchase in the UniFood+ dining halls
          </p>
          <div className={styles.buttons}>
            <Link href={'/en/registration'} className={styles.primaryButton}>
              Get QR code
              <span className={styles.arrow}>→</span>
            </Link>
            <Link href={'/en/#more'} className={styles.secondaryButton}>
              About the program
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
              <span className={styles.statLabel}>Maximum cashback</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50%</span>
              <span className={styles.statLabel}>Bonus payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 