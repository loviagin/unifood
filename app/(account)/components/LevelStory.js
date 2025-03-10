'use client';

import { LEVELS } from '../constants/levels';
import { useState } from 'react';
import styles from './LevelStory.module.css';

export default function LevelStory({ isOpen, onClose, currentLevel }) {
    const levels = Object.values(LEVELS);
    const currentLevelIndex = levels.findIndex(level => level.name === currentLevel);

    // Рассчитываем кешбэк в зависимости от уровня
    const getCashback = (level) => {
        switch (level) {
            case 'Новичок':
                return 3;
            case 'Постоянный клиент':
                return 5;
            case 'VIP':
                return 7;
            default:
                return 3;
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div>
                        <h3 className={styles.title}>Ваш путь</h3>
                        <p className={styles.subtitle}>От новичка до VIP-клиента</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className={styles.closeButton}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className={styles.levelsList}>
                    {levels.map((level, index) => (
                        <div key={level.name} className={styles.levelItem}>
                            <div className={`${styles.levelContent} ${index > currentLevelIndex ? styles.inactive : ''}`}>
                                <div className={`${styles.levelIcon} ${index <= currentLevelIndex ? styles.levelIconActive : styles.levelIconInactive}`}>
                                    {index <= currentLevelIndex ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>
                                <div className={styles.levelDetails}>
                                    <div className={styles.levelName}>{level.name}</div>
                                    <div className={styles.levelBadges}>
                                        <span className={`${styles.levelBadge} ${index <= currentLevelIndex ? styles.discountBadge : styles.inactiveBadge}`}>
                                            Скидка {level.discount}%
                                        </span>
                                        <span className={`${styles.levelBadge} ${index <= currentLevelIndex ? styles.cashbackBadge : styles.inactiveBadge}`}>
                                            Кешбек {getCashback(level.name)}%
                                        </span>
                                    </div>
                                    <p className={styles.levelRequirement}>
                                        {index === levels.length - 1 
                                            ? 'Максимальный уровень' 
                                            : `Нужно потратить ${level.requiredAmount.toLocaleString('ru-RU')} ₽`}
                                    </p>
                                </div>
                            </div>
                            {index < levels.length - 1 && (
                                <div className={`${styles.levelLine} ${index < currentLevelIndex ? styles.levelLineActive : styles.levelLineInactive}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 