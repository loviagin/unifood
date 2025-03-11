import React from 'react';
import { render, screen } from '@testing-library/react';
import TabBar from '../../app/(account)/components/TabBar/TabBar';

// Мокаем next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Мокаем CSS модули
jest.mock('../../app/(account)/components/TabBar/TabBar.module.css', () => ({
  tabBar: 'tabBar',
  tabItem: 'tabItem',
}));

describe('Тесты компонента TabBar', () => {
  test('должен отображать все пункты навигации', () => {
    const usePathname = require('next/navigation').usePathname;
    usePathname.mockReturnValue('/account');

    render(<TabBar />);
    
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Профиль')).toBeInTheDocument();
  });

  test('должен правильно подсвечивать активную вкладку Главная', () => {
    const usePathname = require('next/navigation').usePathname;
    usePathname.mockReturnValue('/account');

    render(<TabBar />);
    
    const homeLink = screen.getByText('Главная').closest('a');
    expect(homeLink).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Профиль').closest('a')).not.toHaveAttribute('aria-current', 'page');
  });

  test('должен правильно подсвечивать активную вкладку Профиль', () => {
    const usePathname = require('next/navigation').usePathname;
    usePathname.mockReturnValue('/account/profile');

    render(<TabBar />);
    
    const profileLink = screen.getByText('Профиль').closest('a');
    expect(profileLink).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Главная').closest('a')).not.toHaveAttribute('aria-current', 'page');
  });
}); 