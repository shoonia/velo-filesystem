export default {
  roots: [
    '<rootDir>/tests',
  ],
  testMatch: [
    '**/**.spec.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
