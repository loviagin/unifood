import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('История транзакций', () => {
  const mockTransactions = [
    {
      id: 1,
      date: '2024-03-20',
      title: 'Покупка в UniFoodCafe',
      amount: 500,
      bonusesEarned: 15,
      type: 'purchase'
    },
    {
      id: 2,
      date: '2024-03-19',
      title: 'Списание бонусов',
      amount: 100,
      type: 'bonus_spent'
    }
  ];

  test('должен отображать список транзакций', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    mockTransactions.forEach(transaction => {
      expect(screen.getByText(transaction.title)).toBeInTheDocument();
    });
  });

  test('должен форматировать даты корректно', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    expect(screen.getByText('20 марта 2024')).toBeInTheDocument();
  });

  test('должен отображать начисленные бонусы', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    const bonusText = screen.getByText(/\+15 бонусов/);
    expect(bonusText).toBeInTheDocument();
  });

  test('должен отображать списанные бонусы', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    const spentText = screen.getByText(/-100 бонусов/);
    expect(spentText).toBeInTheDocument();
  });

  test('должен сортировать транзакции по дате', () => {
    const { container } = render(<TransactionHistory transactions={mockTransactions} />);
    
    const dates = Array.from(container.querySelectorAll('.historyDate'))
      .map(el => el.textContent);
    
    expect(dates).toEqual([
      '20 марта 2024',
      '19 марта 2024'
    ]);
  });

  test('должен применять разные стили для разных типов транзакций', () => {
    render(<TransactionHistory transactions={mockTransactions} />);
    
    const purchaseAmount = screen.getByText(/500/);
    const spentAmount = screen.getByText(/-100/);
    
    expect(purchaseAmount).toHaveClass('historyAmount');
    expect(spentAmount).toHaveClass('historyAmount spent');
  });

  test('должен отображать сообщение при отсутствии транзакций', () => {
    render(<TransactionHistory transactions={[]} />);
    
    expect(screen.getByText('Нет истории транзакций')).toBeInTheDocument();
  });
}); 