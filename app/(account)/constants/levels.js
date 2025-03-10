export const LEVELS = {
    NOVICE: {
        name: "Новичок",
        nextLevel: 1000,
        requiredAmount: 1000
    },
    REGULAR: {
        name: "Постоянный клиент",
        nextLevel: 2000,
        requiredAmount: 2000
    },
    VIP: {
        name: "VIP",
        nextLevel: 5000,
        requiredAmount: 5000
    }
};

export const getLevelByName = (name) => {
    return Object.values(LEVELS).find(level => level.name === name);
};

export const getNextLevel = (currentLevel) => {
    const levels = Object.values(LEVELS);
    const currentIndex = levels.findIndex(level => level.name === currentLevel);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
}; 