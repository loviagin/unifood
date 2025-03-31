import styles from "./Benefits.module.css";
import Image from "next/image";

const Benefits = () => {
    return (
        <section className={styles.benefits} id="more">
            <div className={styles.titleContainer}>
                <h2 className={styles.mainTitle}>Что вы получите</h2>
                <p className={styles.subtitle}>Присоединившись к программе</p>
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
                    <h3 className={styles.benefitTitle}>Система уровней</h3>
                    <p className={styles.benefitDescription}>Чем больше вы покупаете, тем выше уровень. С каждым новым уровнем увеличивается процент кешбека</p>
                </div>

                <div className={`${styles.benefitCard} ${styles.fadeIn}`} role="article">
                    <Image
                        src="/cup-2.png"
                        alt="Покупки за баллы"
                        width={104}
                        height={96}
                        className={styles.benefitIcon}
                    />
                    <h3 className={styles.benefitTitle}>Покупайте за баллы</h3>
                    <p className={styles.benefitDescription}>Покажите QR на кассе и покупайте с большой скидкой или даже бесплатно</p>
                </div>

                <div className={`${styles.benefitCard} ${styles.fadeIn}`} role="article">
                    <Image
                        src="/cup-3.png"
                        alt="История покупок"
                        width={104}
                        height={96}
                        className={styles.benefitIcon}
                    />
                    <h3 className={styles.benefitTitle}>История покупок</h3>
                    <p className={styles.benefitDescription}>Просматривайте когда и что вы купили, а также полученную сумму кешбека</p>
                </div>
            </div>
        </section>
    )
}

export default Benefits