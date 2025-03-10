'use client';

import React from 'react';
import { LEVELS } from '../constants/levels';
import { useState } from 'react';

export default function LevelStory({ isOpen, onClose, currentLevel }) {
    const levels = Object.values(LEVELS);
    const currentLevelIndex = levels.findIndex(level => level.name === currentLevel);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold">Ваш путь</h3>
                            <button 
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {levels.map((level, index) => (
                                <div key={level.name} className="relative">
                                    <div className={`flex items-center ${index <= currentLevelIndex ? 'text-blue-600' : 'text-gray-400'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                                            ${index <= currentLevelIndex ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                                            {index <= currentLevelIndex ? (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <span className="text-sm">{index + 1}</span>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex items-center">
                                                <span className="font-medium">{level.name}</span>
                                                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                    {level.discount}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {index === levels.length - 1 
                                                    ? 'Максимальный уровень' 
                                                    : `Нужно потратить ${level.requiredAmount} ₽`}
                                            </p>
                                        </div>
                                    </div>
                                    {index < levels.length - 1 && (
                                        <div className={`absolute left-4 top-8 w-0.5 h-12 -ml-0.5
                                            ${index < currentLevelIndex ? 'bg-blue-600' : 'bg-gray-300'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 