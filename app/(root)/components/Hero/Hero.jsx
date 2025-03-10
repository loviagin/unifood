import React from 'react';
import styles from "./Hero.module.css";
import Image from "next/image";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroMain}>
                <div className={styles.card}>
                    <div className={styles.coffeeImages}>
                        <Image
                            src="/coffee-cup.png"
                            alt="Coffee cup"
                            width={254}
                            height={254}
                            className={styles.coffeeCup1}
                        />
                    </div>

                    <div className={styles.cardContent}>
                        <div className={styles.cardLogo}>
                            Uni Food<span className={styles.plus}>+</span>
                        </div>
                        <div className={styles.cardNumber}>0203 0405 0607</div>
                        <div className={styles.cardName}>Card holder Name</div>
                    </div>
                </div>

                <div className={styles.heroText}>
                    <h1>
                        Присоединяйтесь
                        к программе лояльности
                        UniFood<span className={styles.plus}>+</span> в РТУ МИРЭА
                    </h1>
                </div>
            </div>

            <a href="/registration">
                <button className={styles.joinButton}>
                    Вступить
                    <span className={styles.plus}>+</span>

                </button>
            </a>

            <a href="/#more" className={styles.learnMore}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 9L12 15L6 9" stroke="#33363F" strokeWidth="2" />
                </svg>
                Узнать преимущества
            </a>
        </section>
    )
}

export default Hero