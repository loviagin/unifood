import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../../app/(account)/account/profile/page';
import { useRouter } from 'next/navigation';

// Мокаем next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/account/profile')
}));

// Мокаем CSS модули
jest.mock('../../app/(account)/styles/Account.module.css', () => ({
  container: 'container',
  content: 'content',
  field: 'field'
}));

describe('Тесты обработки ошибок', () => {
  beforeEach(() => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('должен корректно обрабатывать отсутствие данных в localStorage', () => {
    localStorage.setItem('currentUser', 'testUser'); // Добавляем currentUser чтобы избежать редиректа
    render(<Profile />);
    
    const inputs = screen.getAllByPlaceholderText('Не указано');
    inputs.forEach(input => {
      expect(input.value).toBe('');
    });
  });

  test('должен корректно обрабатывать частично заполненные данные', () => {
    localStorage.setItem('currentUser', 'testUser');
    localStorage.setItem('userName', 'Test User');
    // Намеренно не устанавливаем email и телефон
    
    render(<Profile />);
    
    // Проверяем, что имя пользователя отображается
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    
    // Проверяем, что поля телефона и email пустые
    expect(screen.getByLabelText('Телефон')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
  });

  test('должен корректно обрабатывать некорректные данные в localStorage', () => {
    localStorage.setItem('currentUser', 'testUser');
    localStorage.setItem('userName', ''); // Пустое имя
    localStorage.setItem('userEmail', 'invalid-email'); // Некорректный email
    
    render(<Profile />);
    
    expect(screen.getByLabelText('Имя')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('invalid-email');
  });

  test('должен перенаправлять на страницу входа при отсутствии currentUser', () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    
    render(<Profile />);
    
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  test('должен сохранять состояние после повторного рендера', () => {
    localStorage.setItem('currentUser', 'testUser');
    localStorage.setItem('userName', 'Test User');
    
    const { rerender } = render(<Profile />);
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    
    // Повторный рендер
    rerender(<Profile />);
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
  });
}); 