import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TelegramWidget from '../app/(account)/components/TelegramWidget';

describe('Система поддержки', () => {
  test('виджет Telegram должен быть определен', () => {
    expect(TelegramWidget).toBeDefined();
  });

  test('должен добавлять скрипт Telegram при монтировании', () => {
    render(<TelegramWidget />);
    
    const script = document.querySelector('script[src*="telegram-widget.js"]');
    expect(script).toBeInTheDocument();
  });

  test('должен удалять скрипт Telegram при размонтировании', () => {
    const { unmount } = render(<TelegramWidget />);
    unmount();
    
    const script = document.querySelector('script[src*="telegram-widget.js"]');
    expect(script).not.toBeInTheDocument();
  });

  test('должен иметь корректные атрибуты для виджета', () => {
    render(<TelegramWidget />);
    
    const script = document.querySelector('script[src*="telegram-widget.js"]');
    expect(script).toHaveAttribute('data-telegram-discussion');
    expect(script).toHaveAttribute('data-comments-limit', '5');
  });

  test('iframe должен иметь корректный src', () => {
    render(<TelegramWidget />);
    
    const iframe = screen.getByTitle('Telegram chat widget');
    expect(iframe).toHaveAttribute('src', expect.stringContaining('web.telegram.org'));
  });

  test('должен иметь корректные размеры iframe', () => {
    render(<TelegramWidget />);
    
    const iframe = screen.getByTitle('Telegram chat widget');
    expect(iframe).toHaveAttribute('width', '400');
    expect(iframe).toHaveAttribute('height', '600');
  });
}); 