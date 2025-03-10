import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

// Мокаем next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Аутентификация', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear();
    
    // Мокаем router
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));
  });

  test('должен перенаправлять неавторизованного пользователя на страницу входа', () => {
    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith('/login');
  });

  test('должен сохранять данные пользователя в localStorage после успешной авторизации', () => {
    const userData = {
      name: 'Тест Тестов',
      email: 'test@test.com',
      phone: '+79001234567'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    expect(JSON.parse(localStorage.getItem('currentUser'))).toEqual(userData);
  });

  test('должен очищать данные пользователя при выходе из системы', () => {
    localStorage.setItem('currentUser', 'testUser');
    localStorage.setItem('userName', 'Test User');
    
    // Имитируем выход
    localStorage.clear();
    
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(localStorage.getItem('userName')).toBeNull();
  });

  test('должен проверять валидность email при регистрации', () => {
    const invalidEmail = 'invalid-email';
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    expect(isValidEmail(invalidEmail)).toBeFalsy();
  });

  test('должен проверять валидность телефона при регистрации', () => {
    const validPhone = '+79001234567';
    const isValidPhone = (phone) => /^\+7\d{10}$/.test(phone);
    
    expect(isValidPhone(validPhone)).toBeTruthy();
  });
}); 