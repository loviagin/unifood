import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QRCode from 'qrcode.react';

describe('QR-код', () => {
  const mockUserId = '12345';

  test('должен генерировать QR-код с корректными данными', () => {
    render(<QRCode value={mockUserId} />);
    
    const qrCode = screen.getByRole('img');
    expect(qrCode).toBeInTheDocument();
  });

  test('должен иметь корректный размер', () => {
    render(<QRCode value={mockUserId} size={280} />);
    
    const qrCode = screen.getByRole('img');
    expect(qrCode).toHaveAttribute('width', '280');
    expect(qrCode).toHaveAttribute('height', '280');
  });

  test('должен иметь корректный уровень коррекции ошибок', () => {
    render(<QRCode value={mockUserId} level="H" />);
    
    const qrCode = screen.getByRole('img');
    expect(qrCode).toHaveAttribute('data-level', 'H');
  });

  test('должен обновляться при изменении userId', () => {
    const { rerender } = render(<QRCode value={mockUserId} />);
    
    const newUserId = '67890';
    rerender(<QRCode value={newUserId} />);
    
    const qrCode = screen.getByRole('img');
    expect(qrCode).toHaveAttribute('value', newUserId);
  });

  test('должен иметь корректные стили контейнера', () => {
    render(
      <div className="qrContainer">
        <QRCode value={mockUserId} />
      </div>
    );
    
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass('qrContainer');
  });

  test('должен отображать подпись под QR-кодом', () => {
    render(
      <div>
        <QRCode value={mockUserId} />
        <div className="qrLabel">Отсканируйте для получения бонусов</div>
      </div>
    );
    
    expect(screen.getByText('Отсканируйте для получения бонусов')).toBeInTheDocument();
  });
}); 