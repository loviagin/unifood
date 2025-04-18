import styles from './HowItWorks.module.css';
import Image from 'next/image';

const HowItWorks = () => {
    const steps = [
        {
            icon: '/coffee-plant.webp',
            title: 'Зарегистрируйтесь',
            description: 'С помощью email или телефона'
        },
        {
            icon: '/coffee-vending-machine.webp',
            title: 'Покажите QR-код',
            description: 'При оплате покажите QR-код'
        },
        {
            icon: '/coffee-thermos.webp',
            title: 'Получайте баллы',
            description: 'Копите баллы с каждой покупки'
        }
    ];

    return (
        <section className={styles.howItWorks} id="how-it-works">
            <div className={styles.container}>
                <h2 className={styles.title}>Как это работает</h2>
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