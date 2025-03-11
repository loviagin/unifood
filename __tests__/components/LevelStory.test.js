import React from 'react';
import { render, screen } from '@testing-library/react';
import LevelStory from '../../app/components/LevelStory';
import { LEVELS } from '../../app/constants/levels';

// Мокаем CSS модули
jest.mock('../../app/(root)/styles/Home.module.css', () => ({
  story: 'story',
  storyContent: 'storyContent',
  storyItem: 'storyItem',
  storyItemActive: 'storyItemActive'
}));

describe('Тесты компонента LevelStory', () => {
  const mockProps = {
    isOpen: true,
    onClose: jest.fn(),
    currentLevel: 'Уровень 2'
  };

  test('не должен отображаться, когда isOpen=false', () => {
    render(<LevelStory {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Ваш путь')).not.toBeInTheDocument();
  });

  test('должен отображать заголовок', () => {
    render(<LevelStory {...mockProps} />);
    expect(screen.getByText('Ваш путь')).toBeInTheDocument();
  });

  test('должен отображать все уровни', () => {
    render(<LevelStory {...mockProps} />);
    Object.values(LEVELS).forEach(level => {
      expect(screen.getByText(level.name)).toBeInTheDocument();
    });
  });

  test('должен отображать скидки для каждого уровня', () => {
    render(<LevelStory {...mockProps} />);
    Object.values(LEVELS).forEach(level => {
      expect(screen.getByText(`${level.discount}%`)).toBeInTheDocument();
    });
  });

  test('должен отображать требуемую сумму для каждого уровня кроме последнего', () => {
    render(<LevelStory {...mockProps} />);
    const levels = Object.values(LEVELS);
    levels.slice(0, -1).forEach(level => {
      expect(screen.getByText(`Нужно потратить ${level.requiredAmount} ₽`)).toBeInTheDocument();
    });
    expect(screen.getByText('Максимальный уровень')).toBeInTheDocument();
  });

  test('должен вызывать onClose при нажатии на кнопку закрытия', () => {
    render(<LevelStory {...mockProps} />);
    const closeButton = screen.getByRole('button');
    closeButton.click();
    expect(mockProps.onClose).toHaveBeenCalled();
  });
}); 