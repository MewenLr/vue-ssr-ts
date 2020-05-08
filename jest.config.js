module.exports = {
  moduleFileExtensions: [
    'js',
    'ts',
    'vue',
  ],
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest',
  },
}
