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
  card: 'card',
  cardHeader: 'cardHeader',
  fields: 'fields',
  field: 'field'
}));

describe('Тесты карточки с личными данными', () => {
  beforeEach(() => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    localStorage.setItem('currentUser', 'testUser');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('должна отображаться карточка с заголовком "Личные данные"', () => {
    render(<Profile />);
    expect(screen.getByText('Личные данные')).toBeInTheDocument();
  });

  test('должны отображаться все поля ввода с соответствующими метками', () => {
    render(<Profile />);
    
    expect(screen.getByLabelText('Имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Телефон')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('все поля должны быть неактивны', () => {
    render(<Profile />);
    
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  test('должны отображаться плейсхолдеры для пустых полей', () => {
    render(<Profile />);
    
    const inputs = screen.getAllByPlaceholderText('Не указано');
    expect(inputs.length).toBeGreaterThan(0);
    inputs.forEach(input => {
      expect(input).toHaveAttribute('placeholder', 'Не указано');
    });
  });

  test('должны корректно отображаться данные пользователя', () => {
    // Устанавливаем тестовые данные
    localStorage.setItem('userName', 'Тест Тестов');
    localStorage.setItem('userPhone', '+7 999 999-99-99');
    localStorage.setItem('userEmail', 'test@test.com');
    
    render(<Profile />);
    
    expect(screen.getByDisplayValue('Тест Тестов')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+7 999 999-99-99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
  });

  test('поля должны иметь правильные типы ввода', () => {
    render(<Profile />);
    
    expect(screen.getByLabelText('Имя')).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Телефон')).toHaveAttribute('type', 'tel');
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });
}); 