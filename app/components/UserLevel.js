'use client';

import { LEVELS } from '../constants/levels';
import { useState, useEffect } from 'react';

export default function UserLevel({ level, progress }) {
    const [currentLevel, setCurrentLevel] = useState(null);
    
    useEffect(() => {
        const levelInfo = Object.values(LEVELS).find(l => l.name === level);
        setCurrentLevel(levelInfo);
    }, [level]);

    if (!currentLevel) return null;

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-lg font-semibold">{currentLevel.name}</h3>
                    <p className="text-sm text-gray-600">Скидка {currentLevel.discount}%</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Прогресс</p>
                    <p className="font-semibold">{Math.round(progress)}%</p>
                </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                />
            </div>
            
            {progress < 100 && (
                <p className="text-sm text-gray-600 mt-2">
                    До следующего уровня: {Math.ceil((100 - progress) * currentLevel.nextLevel / 100)} ₽
                </p>
            )}
        </div>
    );
} 