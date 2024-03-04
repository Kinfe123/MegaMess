module.exports = {
    preset: 'ts-jest',
    env: true,
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
  };