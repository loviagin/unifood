import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../../app/(root)/components/Hero/Hero';

// Мокаем next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />
  },
}));

// Мокаем CSS модули
jest.mock('../../app/(root)/components/Hero/Hero.module.css', () => ({
  hero: 'hero',
  heroMain: 'heroMain',
  card: 'card',
  coffeeImages: 'coffeeImages',
  coffeeCup1: 'coffeeCup1',
  cardContent: 'cardContent',
  cardLogo: 'cardLogo',
  plus: 'plus',
  cardNumber: 'cardNumber',
  cardName: 'cardName',
  heroText: 'heroText',
  joinButton: 'joinButton',
  learnMore: 'learnMore'
}));

describe('Тесты компонента Hero', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  test('должен отображать заголовок с правильным текстом', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Присоединяйтесь к программе лояльности UniFood+ в РТУ МИРЭА'
    );
  });

  test('должен отображать изображение кофейной чашки', () => {
    const image = screen.getByAltText('Coffee cup');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/coffee-cup.png');
    expect(image).toHaveAttribute('width', '254');
    expect(image).toHaveAttribute('height', '254');
  });

  test('должен отображать карту с правильной информацией', () => {
    expect(screen.getByText('Uni Food')).toBeInTheDocument();
    expect(screen.getByText('0203 0405 0607')).toBeInTheDocument();
    expect(screen.getByText('Card holder Name')).toBeInTheDocument();
  });

  test('должен отображать кнопку "Вступить"', () => {
    const button = screen.getByRole('button', { name: /Вступить/i });
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/registration');
  });

  test('должен отображать ссылку "Узнать преимущества"', () => {
    const link = screen.getByText('Узнать преимущества');
    expect(link.closest('a')).toHaveAttribute('href', '/#more');
  });
}); 