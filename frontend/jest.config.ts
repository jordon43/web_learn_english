const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });


/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

module.exports = createJestConfig(customJestConfig);