import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../app/(account)/account/profile/page';

// Мокаем хук useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Профиль пользователя', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('должен отображать имя пользователя из localStorage', () => {
    localStorage.setItem('userName', 'Тест Тестов');
    render(<Profile />);
    
    expect(screen.getByDisplayValue('Тест Тестов')).toBeInTheDocument();
  });

  test('должен отображать email пользователя из localStorage', () => {
    localStorage.setItem('userEmail', 'test@test.com');
    render(<Profile />);
    
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
  });

  test('должен отображать телефон пользователя из localStorage', () => {
    localStorage.setItem('userPhone', '+79001234567');
    render(<Profile />);
    
    expect(screen.getByDisplayValue('+79001234567')).toBeInTheDocument();
  });

  test('должен отображать placeholder при отсутствии данных', () => {
    render(<Profile />);
    
    const inputs = screen.getAllByPlaceholderText('Не указано');
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('поля ввода должны быть неактивны', () => {
    render(<Profile />);
    
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  test('должна отображаться кнопка поддержки', () => {
    render(<Profile />);
    
    expect(screen.getByText('Поддержка')).toBeInTheDocument();
  });

  test('должна отображаться кнопка выхода', () => {
    render(<Profile />);
    
    expect(screen.getByText('Выйти')).toBeInTheDocument();
  });
}); 