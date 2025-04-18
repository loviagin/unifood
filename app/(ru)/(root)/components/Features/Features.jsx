import styles from './Features.module.css';

const features = [
  {
    title: 'Удобная система баллов',
    description: 'Начисляем баллы за каждую покупку в столовой университета. Чем больше тратите, тем больше получаете',
    icon: '💳',
    color: '#4CAF50'
  },
  {
    title: 'Специальные предложения',
    description: 'Эксклюзивные скидки и акции для участников программы. Специальные блюда со скидкой каждый день',
    icon: '🎁',
    color: '#FF9800'
  },
  {
    title: 'Мгновенные начисления',
    description: 'Баллы начисляются сразу после оплаты покупки. Никаких задержек и ожидания',
    icon: '⚡',
    color: '#2196F3'
  },
  {
    title: 'Уровни программы',
    description: 'Повышайте уровень программы и получайте больше баллов за каждую покупку',
    icon: '⭐',
    color: '#9C27B0'
  },
  {
    title: 'История операций',
    description: 'Всегда знайте, сколько баллов у вас есть и как вы их потратили',
    icon: '📊',
    color: '#E91E63'
  },
  {
    title: 'Безопасность',
    description: 'Защищенная система с QR-кодами и шифрованием данных',
    icon: '🔒',
    color: '#607D8B'
  }
];

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Преимущества программы</h2>
          <p className={styles.subtitle}>Присоединяйтесь к UniFood+ и получайте максимум выгоды от каждой покупки</p>
        </div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={styles.card}
              style={{ '--card-color': feature.color }}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: `${feature.color}15` }}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 