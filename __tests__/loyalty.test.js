import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LEVELS } from '../app/(account)/constants/levels';
import UserLevel from '../app/(account)/components/UserLevel';
import LevelStory from '../app/(account)/components/LevelStory';

describe('Система лояльности', () => {
  test('должны быть определены все уровни лояльности', () => {
    expect(LEVELS).toBeDefined();
    expect(LEVELS.length).toBe(3); // NOVICE, REGULAR, VIP
  });

  test('каждый уровень должен иметь необходимые свойства', () => {
    LEVELS.forEach(level => {
      expect(level).toHaveProperty('name');
      expect(level).toHaveProperty('requiredAmount');
      expect(level).toHaveProperty('cashback');
    });
  });

  test('значения кэшбэка должны быть корректными', () => {
    const [NOVICE, REGULAR, VIP] = LEVELS;
    
    expect(NOVICE.cashback).toBe(3);
    expect(REGULAR.cashback).toBe(5);
    expect(REGULAR.cashback).toBeGreaterThan(NOVICE.cashback);
    expect(VIP.cashback).toBe(7);
    expect(VIP.cashback).toBeGreaterThan(REGULAR.cashback);
  });

  test('требования для уровней должны быть возрастающими', () => {
    for (let i = 1; i < LEVELS.length; i++) {
      expect(LEVELS[i].requiredAmount).toBeGreaterThan(LEVELS[i-1].requiredAmount);
    }
  });

  test('компонент UserLevel должен отображать текущий уровень', () => {
    const currentLevel = LEVELS[0];
    render(<UserLevel currentLevel={currentLevel} />);
    
    expect(screen.getByText(currentLevel.name)).toBeInTheDocument();
  });

  test('компонент UserLevel должен отображать процент кэшбэка', () => {
    const currentLevel = LEVELS[0];
    render(<UserLevel currentLevel={currentLevel} />);
    
    expect(screen.getByText(`${currentLevel.cashback}%`)).toBeInTheDocument();
  });

  test('компонент LevelStory должен отображать все уровни', () => {
    render(<LevelStory isOpen={true} onClose={() => {}} />);
    
    LEVELS.forEach(level => {
      expect(screen.getByText(level.name)).toBeInTheDocument();
    });
  });

  test('прогресс-бар должен корректно отображать прогресс', () => {
    const currentLevel = LEVELS[0];
    const nextLevel = LEVELS[1];
    const progress = 50; // 50%
    
    render(
      <UserLevel 
        currentLevel={currentLevel}
        nextLevel={nextLevel}
        progress={progress}
      />
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });
}); 