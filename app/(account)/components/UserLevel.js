'use client';

import { LEVELS } from '../constants/levels';
import { useState, useEffect } from 'react';
import LevelStory from './LevelStory';
import styles from './UserLevel.module.css';

export default function UserLevel({ level, progress }) {
    const [currentLevel, setCurrentLevel] = useState(null);
    const [isStoryOpen, setIsStoryOpen] = useState(false);

    useEffect(() => {
        const levelInfo = Object.values(LEVELS).find(l => l.name === level);
        setCurrentLevel(levelInfo);
    }, [level]);

    if (!currentLevel) return null;

    return (
        <>
            <div
                className={styles.levelCard}
                onClick={() => setIsStoryOpen(true)}
            >
                <div className={styles.levelContent}>
                    <div className={styles.levelHeader}>
                        <h3 className={styles.levelName}>{currentLevel.name}</h3>
                        <div className={styles.badges}>
                            <span className={`${styles.badge} ${styles.cashbackBadge}`}>
                                Кешбек {currentLevel.cashback}%
                            </span>
                        </div>
                    </div>

                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className={styles.progressText}>
                            {Math.round(progress)}%
                        </span>
                    </div>

                    {currentLevel.nextLevel > 0 && (
                        <p className={styles.nextLevelText}>
                            До следующего уровня: {Math.ceil((100 - progress) * currentLevel.nextLevel / 100)} ₽
                        </p>
                    )}
                </div>
            </div>

            <LevelStory
                isOpen={isStoryOpen}
                onClose={() => setIsStoryOpen(false)}
                currentLevel={level}
            />
        </>
    );
} 