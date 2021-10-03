/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
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
  testEnvironment: 'jsdom'
};

export { config as default };
