const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Путь к вашему приложению Next.js
  dir: './',
})

// Добавляем любые кастомные настройки для Jest
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
}

// createJestConfig экспортируется таким образом для обеспечения загрузки и валидации next.config.js и .env файлов
module.exports = createJestConfig(customJestConfig) 