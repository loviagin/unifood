import styles from "./Benefits.module.css";
import Image from "next/image";

const Benefits = () => {
    return (
        <section className={styles.benefits}>
            <h2>Что вы получите</h2>
            <p>Присоединившись к программе</p>

            {[1, 2, 3].map((num) => (
                <div key={num} className={styles.benefitCard}>
                    <Image
                        src="/benefit-icon.png"
                        alt="Benefit icon"
                        width={104}
                        height={96}
                    />
                    <h3>Преимущество #{num}</h3>
                    <p>Я получу что-то очень {num === 1 ? 'крутое' : num === 2 ? 'вкусное' : 'выгодное'} ммм . . .</p>
                </div>
            ))}
        </section>
    )
}

export default Benefits