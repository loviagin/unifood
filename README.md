# Uni Food Plus

Программа лояльности Uni Food в РТУ МИРЭА - веб-приложение для управления бонусами и заказами в сети кафе университета.

## 🚀 Технологии

- **Frontend**: Next.js 14.1.0, React 18
- **Стилизация**: CSS Modules, Styled Components
- **База данных**: MongoDB
- **Аутентификация**: bcrypt
- **Тестирование**: Jest, React Testing Library
- **PWA**: Поддержка Progressive Web App

## 📋 Возможности

- Авторизация пользователей (email + пароль)
- Личный кабинет с информацией о бонусах
- Просмотр истории заказов
- Управление профилем
- Адаптивный дизайн
- PWA с поддержкой оффлайн режима

## 📱 PWA возможности

- Установка на домашний экран
- Работа в оффлайн режиме
- Push-уведомления (в разработке)
- Быстрая загрузка

## 🎨 Дизайн

Приложение использует современный дизайн с акцентом на удобство использования:
- Градиентные элементы
- Анимации для интерактивных элементов
- Адаптивный интерфейс для всех устройств
- Поддержка тёмной темы (в разработке)

  [Макет в Figma](https://www.figma.com/design/zqanayTSd94nJYTiwYcWxU/Uni-cafe-plus?node-id=0-1&t=CRGE7QDhA8xV78mh-1)

## 🔒 Безопасность

- Хеширование паролей с bcrypt
- Защита от XSS атак
- CSRF токены
- Безопасные HTTP заголовки
- Валидация данных на клиенте и сервере

## 📞 Контакты

- Разработчики: [Илья Ловягин](https://github.com/loviagin), [Роман Сычев](https://github.com/resclpupu)
- Email: support@lovigin.com
- Telegram: @loviagin

## 🗺 Планы развития

- [ ] Поддержка тёмной темы
- [ ] Расширенная статистика для пользователей
- [ ] [Мобильное приложение](https://github.com/loviagin/unifood-admin)

Сайт [Uni Food Plus](https://unifood.space)

Презентация [проекта](https://docs.google.com/presentation/d/1noYOWE9xFsqjOuxVfqLtfV_6LexIuWECcCoLF4nBeCs/edit?usp=sharing)

## 🛠 Установка и запуск

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/loviagin/unifood.git
   cd unifood
   ```

2. **Установка зависимостей**
   ```bash
   npm install
   ```

3. **Запуск для разработки**
   ```bash
   npm run dev
   ```

4. **Сборка для продакшена**
   ```bash
   npm run build
   npm start
   ```

## 🧪 Тестирование

```bash
# Запуск всех тестов
npm test

# Запуск тестов в режиме watch
npm run test:watch
```

