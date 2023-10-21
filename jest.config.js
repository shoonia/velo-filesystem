/** @type {import('jest').Config} */
const config = {
  roots: [
    '<rootDir>/tests',
  ],
  testMatch: [
    '**/**.spec.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'jest-environment-jsdom'
};

export { config as default };
