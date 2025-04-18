export const LEVELS = {
    NOVICE: {
        name: "Novice",
        nextLevel: 1000,
        requiredAmount: 1000,
        cashback: 3
    },
    REGULAR: {
        name: "Regular",
        nextLevel: 2000,
        requiredAmount: 2000,
        cashback: 5
    },
    VIP: {
        name: "VIP",
        nextLevel: 5000,
        requiredAmount: 5000,
        cashback: 7
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