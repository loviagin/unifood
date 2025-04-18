import styles from "./Benefits.module.css";
import Image from "next/image";

const Benefits = () => {
    return (
        <section className={styles.benefits} id="more">
            <div className={styles.titleContainer}>
                <h2 className={styles.mainTitle}>What will you get</h2>
                <p className={styles.subtitle}>By joining the program</p>
            </div>

            <div className={styles.benefitsContainer}>
                <div className={`${styles.benefitCard} ${styles.fadeIn}`} role="article">
                    <Image
                        src="/cup-1.png"
                        alt="Система уровней"
                        width={104}
                        height={96}
                        className={styles.benefitIcon}
                    />
                    <h3 className={styles.benefitTitle}>Level system</h3>
                    <p className={styles.benefitDescription}>The more you buy, the higher the level. With each new level, the cashback percentage increases</p>
                </div>

                <div className={`${styles.benefitCard} ${styles.fadeIn}`} role="article">
                    <Image
                        src="/cup-2.png"
                        alt="Покупки за баллы"
                        width={104}
                        height={96}
                        className={styles.benefitIcon}
                    />
                    <h3 className={styles.benefitTitle}>Buy with points</h3>
                    <p className={styles.benefitDescription}>Show the QR code at the checkout and buy with a large discount or even for free</p>
                </div>

                <div className={`${styles.benefitCard} ${styles.fadeIn}`} role="article">
                    <Image
                        src="/cup-3.png"
                        alt="История покупок"
                        width={104}
                        height={96}
                        className={styles.benefitIcon}
                    />
                    <h3 className={styles.benefitTitle}>Purchase history</h3>
                    <p className={styles.benefitDescription}>View when and what you bought, as well as the amount of cashback received</p>
                </div>
            </div>
        </section>
    )
}

export default Benefits