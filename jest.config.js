/** @type {import('jest').Config} */
const config = {
  cache: false,
  roots: [
    '<rootDir>/tests',
  ],
  testMatch: [
    '**/**.spec.ts',
  ],
  transform: {
    '\\.ts$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  extensionsToTreatAsEsm: ['.ts'],
};

export { config as default };
