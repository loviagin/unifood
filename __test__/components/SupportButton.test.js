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
  supportButton: 'supportButton',
  supportModal: 'supportModal',
  supportOverlay: 'supportOverlay'
}));

describe('Тесты кнопки поддержки и модального окна', () => {
  beforeEach(() => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    localStorage.setItem('currentUser', 'testUser');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('должна отображаться кнопка поддержки с иконкой', () => {
    render(<Profile />);
    
    const supportButton = screen.getByRole('button', { name: /поддержка/i });
    expect(supportButton).toBeInTheDocument();
    expect(supportButton.querySelector('svg')).toBeInTheDocument();
  });

  test('должно открываться модальное окно при нажатии на кнопку поддержки', () => {
    render(<Profile />);
    
    const supportButton = screen.getByRole('button', { name: /поддержка/i });
    fireEvent.click(supportButton);
    
    expect(screen.getByText('Поддержка прогуливала пары ;)')).toBeInTheDocument();
  });

  test('должна быть кнопка закрытия в модальном окне', () => {
    render(<Profile />);
    
    // Открываем модальное окно
    const supportButton = screen.getByRole('button', { name: /поддержка/i });
    fireEvent.click(supportButton);
    
    const closeButton = screen.getByRole('button', { name: '' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.querySelector('svg')).toBeInTheDocument();
  });

  test('модальное окно должно закрываться при нажатии на кнопку закрытия', () => {
    render(<Profile />);
    
    // Открываем модальное окно
    const supportButton = screen.getByRole('button', { name: /поддержка/i });
    fireEvent.click(supportButton);
    
    // Закрываем модальное окно
    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    
    expect(screen.queryByText('Поддержка прогуливала пары ;)')).not.toBeInTheDocument();
  });

  test('модальное окно должно закрываться при клике на оверлей', () => {
    render(<Profile />);
    
    // Открываем модальное окно
    const supportButton = screen.getByRole('button', { name: /поддержка/i });
    fireEvent.click(supportButton);
    
    // Кликаем по оверлею
    const overlay = screen.getByTestId('support-overlay');
    fireEvent.click(overlay);
    
    expect(screen.queryByText('Поддержка прогуливала пары ;)')).not.toBeInTheDocument();
  });
}); 