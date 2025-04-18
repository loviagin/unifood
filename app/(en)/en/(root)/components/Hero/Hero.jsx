import styles from "./Hero.module.css";
import Image from "next/image";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground}>
                <div className={styles.gradientOverlay}></div>
                <div className={styles.pattern}></div>
            </div>
            
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <div className={styles.badge}>
                        <span className={styles.badgeText}>New loyalty program</span>
                    </div>
                    <h1>
                        UniFood<span className={styles.plus}>+</span>
                        <br />
                        <span className={styles.highlight}>Your path to bonuses</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Join the loyalty program of RTU MIREA and get
                        exclusive bonuses for each purchase
                    </p>
                    <div className={styles.ctaContainer}>
                        <a href="/en/registration" className={styles.primaryButton}>
                            <span>Start now</span>
                            <div className={styles.buttonGlow}></div>
                        </a>
                        <a href="/en/#more" className={styles.secondaryButton}>
                            <span>Learn more</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M18 9L12 15L6 9" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardLogo}>
                                    Uni Food<span className={styles.plus}>+</span>
                                </div>
                                <div className={styles.cardChip}></div>
                            </div>
                            <div className={styles.cardNumber}>0203 0405 0607</div>
                            <div className={styles.cardName}>Card holder Name</div>
                        </div>
                        <div className={styles.coffeeImage}>
                            <Image
                                src="/coffee-cup.png"
                                alt="Coffee cup"
                                width={280}
                                height={280}
                                className={styles.coffeeCup}
                            />
                            <div className={styles.coffeeGlow}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero