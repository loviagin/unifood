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
  card: 'card',
  cardHeader: 'cardHeader',
  fields: 'fields',
  field: 'field'
}));

describe('Тесты формы профиля', () => {
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

  test('должен отображать заголовок "Личные данные"', () => {
    render(<Profile />);
    expect(screen.getByText('Личные данные')).toBeInTheDocument();
  });

  test('должен отображать все поля формы', () => {
    render(<Profile />);
    
    expect(screen.getByLabelText('Имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Телефон')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('должен отображать плейсхолдеры для пустых полей', () => {
    render(<Profile />);
    
    const inputs = screen.getAllByPlaceholderText('Не указано');
    expect(inputs).toHaveLength(3); // Имя, телефон и email
  });

  test('должен загружать данные пользователя из localStorage', () => {
    // Устанавливаем данные в localStorage
    localStorage.setItem('userName', 'Тест Тестов');
    localStorage.setItem('userPhone', '+7 999 999-99-99');
    localStorage.setItem('userEmail', 'test@test.com');
    
    render(<Profile />);
    
    expect(screen.getByDisplayValue('Тест Тестов')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+7 999 999-99-99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
  });

  test('все поля должны быть неактивны', () => {
    render(<Profile />);
    
    const nameInput = screen.getByLabelText('Имя');
    const phoneInput = screen.getByLabelText('Телефон');
    const emailInput = screen.getByLabelText('Email');
    
    expect(nameInput).toBeDisabled();
    expect(phoneInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
  });
}); 