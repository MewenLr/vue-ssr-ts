module.exports = {
  // roots: [
  // 'src',
  // '<rootDir>',
  // ],
  // modulePaths: [
  //   '<rootDir>',
  // ],
  moduleDirectories: ['node_modules', 'src'],

  // moduleFileExtensions: [
  //   'js',
  //   'ts',
  //   'vue',
  // ],
  // testMatch: [
  //   '<rootDir>/src/**/*.test.ts',
  // ],
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/src/$1',
  // },
  // transform: {
  //   '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  //   '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest',
  // },

  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    // tell Jest to handle *.vue files
    'vue',
  ],

  // testRegex: '.test.ts$',
  transform: {
    // process TypeScript files
    '^.+\\.(t|j)s$': 'ts-jest',
    // '^.+\\.ts$': 'ts-jest',
    // process *.vue files with vue-jest
    '.*\\.(vue)$': 'vue-jest',
  },
  // support the same @ -> src alias mapping in source code
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // '^@/(.*)$': '<rootDir>/src/$1',
    // '^@/(.*)$': '<rootDir>/src/$1',
  },

  // serializer for snapshots
  // snapshotSerializers: [
  //   'jest-serializer-vue',
  // ],
}
