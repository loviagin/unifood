import styles from "./Benefits.module.css";
import Image from "next/image";

const Benefits = () => {
    return (
        <section className={styles.benefits} id="more">
            <h2>Что вы получите</h2>
            <p>Присоединившись к программе</p>

            <div className={styles.benefitsContainer}>
                <div className={styles.benefitCard}>
                    <Image
                        src="/cup-1.png"
                        alt="Benefit icon"
                        width={104}
                        height={96}
                    />
                    <h3>Система уровней</h3>
                    <p>Чем больше вы покупаете, тем выше уровень. С каждым новым уровнем увеличивается процент кешбека</p>
                </div>

                <div className={styles.benefitCard}>
                    <Image
                        src="/cup-2.png"
                        alt="Benefit icon"
                        width={104}
                        height={96}
                    />
                    <h3>Покупайте за баллы</h3>
                    <p>Покажите QR на кассе и покупайте с большой скидкой или даже бесплатно</p>
                </div>

                <div className={styles.benefitCard}>
                    <Image
                        src="/cup-3.png"
                        alt="Benefit icon"
                        width={104}
                        height={96}
                    />
                    <h3>История покупок</h3>
                    <p>Просматривайте когда и что вы купили, а также полученную сумму кешбека</p>
                </div>
            </div>
        </section>
    )
}

export default Benefits