import styles from './Features.module.css';

const features = [
  {
    title: 'Convenient points system',
    description: 'We award points for each purchase in the university cafeteria. The more you spend, the more you get',
    icon: '💳',
    color: '#4CAF50'
  },
  {
    title: 'Special offers',
    description: 'Exclusive discounts and promotions for program participants. Special dishes with a discount every day',
    icon: '🎁',
    color: '#FF9800'
  },
  {
    title: 'Instant accruals',
    description: 'Points are credited immediately after the purchase. No delays or waiting',
    icon: '⚡',
    color: '#2196F3'
  },
  {
    title: 'Program levels',
    description: 'Increase the program level and get more points for each purchase',
    icon: '⭐',
    color: '#9C27B0'
  },
  {
    title: 'Purchase history',
    description: 'Always know how many points you have and how you spent them',
    icon: '📊',
    color: '#E91E63'
  },
  {
    title: 'Security',
    description: 'Protected system with QR codes and data encryption',
    icon: '🔒',
    color: '#607D8B'
  }
];

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Advantages of the program</h2>
          <p className={styles.subtitle}>Join UniFood+ and get the maximum benefit from each purchase</p>
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