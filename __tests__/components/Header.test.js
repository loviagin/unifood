import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
  header: 'header',
  button: 'button'
}));

describe('Тесты компонентов хедера', () => {
  beforeEach(() => {
    // Мокаем router и localStorage
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    localStorage.setItem('currentUser', 'testUser');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('должен отображать заголовок "Профиль"', () => {
    render(<Profile />);
    expect(screen.getByRole('heading', { name: 'Профиль', level: 1 })).toBeInTheDocument();
  });

  test('должен отображать кнопку выхода с иконкой', () => {
    render(<Profile />);
    
    const logoutButton = screen.getByRole('button', { name: 'Выйти' });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton.querySelector('svg')).toBeInTheDocument();
  });

  test('должен вызывать handleLogout при нажатии на кнопку выхода', () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    
    // Устанавливаем тестовые данные в localStorage
    localStorage.setItem('userName', 'Test User');
    localStorage.setItem('userEmail', 'test@test.com');
    
    render(<Profile />);
    
    const logoutButton = screen.getByRole('button', { name: 'Выйти' });
    fireEvent.click(logoutButton);
    
    // Проверяем, что данные очищены из localStorage
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(localStorage.getItem('userName')).toBeNull();
    expect(localStorage.getItem('userEmail')).toBeNull();
    
    // Проверяем, что произошло перенаправление на главную
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  test('должен иметь правильную структуру хедера', () => {
    render(<Profile />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
    expect(header.children).toHaveLength(2); // Заголовок и кнопка выхода
  });
}); 