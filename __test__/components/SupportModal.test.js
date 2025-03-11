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
  supportButton: 'supportButton',
  supportOverlay: 'supportOverlay',
  supportModal: 'supportModal',
  supportHeader: 'supportHeader',
  closeButton: 'closeButton'
}));

describe('Тесты модального окна поддержки', () => {
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

  test('должен открывать модальное окно при нажатии на кнопку поддержки', () => {
    render(<Profile />);
    
    const supportButton = screen.getByText('Поддержка');
    fireEvent.click(supportButton);
    
    expect(screen.getByText('Поддержка прогуливала пары ;)')).toBeInTheDocument();
  });

  test('должен закрывать модальное окно при нажатии на кнопку закрытия', () => {
    render(<Profile />);
    
    // Открываем модальное окно
    const supportButton = screen.getByText('Поддержка');
    fireEvent.click(supportButton);
    
    // Находим и нажимаем кнопку закрытия
    const closeButton = screen.getByRole('button', { name: '' }); // Кнопка с SVG иконкой
    fireEvent.click(closeButton);
    
    // Проверяем, что модальное окно закрылось
    expect(screen.queryByText('Поддержка прогуливала пары ;)')).not.toBeInTheDocument();
  });

  test('должен закрывать модальное окно при клике на оверлей', () => {
    render(<Profile />);
    
    // Открываем модальное окно
    const supportButton = screen.getByText('Поддержка');
    fireEvent.click(supportButton);
    
    // Находим оверлей по классу и кликаем по нему
    const overlay = screen.getByTestId('support-overlay');
    fireEvent.click(overlay);
    
    // Проверяем, что модальное окно закрылось
    expect(screen.queryByText('Поддержка прогуливала пары ;)')).not.toBeInTheDocument();
  });
}); 