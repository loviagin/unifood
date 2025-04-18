import styles from './HowItWorks.module.css';
import Image from 'next/image';

const HowItWorks = () => {
    const steps = [
        {
            icon: '/coffee-plant.webp',
            title: 'Register',
            description: 'With email or phone'
        },
        {
            icon: '/coffee-vending-machine.webp',
            title: 'Show QR-code',
            description: 'Show QR-code at the checkout'
        },
        {
            icon: '/coffee-thermos.webp',
            title: 'Get points',
            description: 'Get points with each purchase'
        }
    ];

    return (
        <section className={styles.howItWorks} id="how-it-works">
            <div className={styles.container}>
                <h2 className={styles.title}>How it works</h2>
                <div className={styles.stepsContainer}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.step}>
                            <div className={styles.iconWrapper}>
                                <Image
                                    src={step.icon}
                                    alt={step.title}
                                    width={64}
                                    height={64}
                                    className={styles.icon}
                                />
                            </div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;