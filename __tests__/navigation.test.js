import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TabBar from '../app/(account)/components/TabBar/TabBar';

// Мокаем next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/'
  }),
  usePathname: () => '/'
}));

describe('Навигация', () => {
  test('должен отображать все пункты меню', () => {
    render(<TabBar />);
    
    const menuItems = ['Главная', 'История', 'Профиль'];
    menuItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('должен подсвечивать активный пункт меню', () => {
    render(<TabBar />);
    
    const activeItem = screen.getByText('Главная').closest('a');
    expect(activeItem).toHaveClass('active');
  });

  test('должен иметь корректные ссылки', () => {
    render(<TabBar />);
    
    expect(screen.getByText('Главная').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('История').closest('a')).toHaveAttribute('href', '/history');
    expect(screen.getByText('Профиль').closest('a')).toHaveAttribute('href', '/profile');
  });

  test('должен отображать иконки для каждого пункта меню', () => {
    render(<TabBar />);
    
    const icons = screen.getAllByRole('img', { hidden: true });
    expect(icons).toHaveLength(3);
  });

  test('должен быть зафиксирован внизу экрана', () => {
    const { container } = render(<TabBar />);
    
    expect(container.firstChild).toHaveClass('fixed bottom-0');
  });

  test('должен иметь корректный цвет фона', () => {
    const { container } = render(<TabBar />);
    
    expect(container.firstChild).toHaveClass('bg-white');
  });

  test('должен иметь тень', () => {
    const { container } = render(<TabBar />);
    
    expect(container.firstChild).toHaveClass('shadow-lg');
  });
}); 