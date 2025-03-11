import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Profile from '../../app/(account)/account/profile/page';

// Мокаем next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/account/profile')
}));

// Мокаем CSS модули
jest.mock('../../styles/Account.module.css', () => ({
  container: 'container',
  header: 'header',
  button: 'button',
  content: 'content',
  card: 'card',
  cardHeader: 'cardHeader',
  fields: 'fields',
  field: 'field'
}));

describe('Тесты аутентификации', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear();
    // Очищаем моки
    jest.clearAllMocks();
  });

  test('должен перенаправить неавторизованного пользователя на /login', () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    
    render(<Profile />);
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  test('должен очистить localStorage при выходе', () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    
    localStorage.setItem('currentUser', 'testUser');
    localStorage.setItem('userName', 'Test User');
    
    const { getByText } = render(<Profile />);
    fireEvent.click(getByText('Выйти'));
    
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(localStorage.getItem('userName')).toBeNull();
  });

  test('должен загрузить данные пользователя из localStorage', () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    
    localStorage.setItem('currentUser', 'testUser');
    localStorage.setItem('userName', 'Test User');
    localStorage.setItem('userEmail', 'test@test.com');
    
    const { getByDisplayValue } = render(<Profile />);
    expect(getByDisplayValue('Test User')).toBeInTheDocument();
    expect(getByDisplayValue('test@test.com')).toBeInTheDocument();
  });

  test('должен перенаправить на главную после выхода', () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    
    const { getByText } = render(<Profile />);
    fireEvent.click(getByText('Выйти'));
    
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
}); 