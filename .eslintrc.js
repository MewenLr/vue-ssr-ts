module.exports = {
  env: {
    'browser': true,
    'es6': true,
    'mocha': true,
    'node': true,
    'jest': true,
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': './webpack/webpack.config.js',
      },
    },
  },
  extends: [
    'airbnb-base',
    'plugin:vue/strongly-recommended',
    '@vue/typescript',
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
    'expect': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    'ecmaVersion': 2020,
    'sourceType': 'module',
    // 'parser': '@typescript-eslint/parser',
    'parser': 'babel-eslint',
    'project': './tsconfig.json',
    'allowImportExportEverywhere': true,
    'ecmaFeatures': { legacyDecorators: true },
  },
  // plugins: ['vue', '@typescript-eslint'],
  plugins: ['vue'],
  rules: {
    'linebreak-style': 'off',
    'no-return-assign': 'off',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-underscore-dangle': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'import/extensions': ['error', { 'ts': 'never', 'vue': 'always' }],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'no-param-reassign': ['error', {'props': true, 'ignorePropertyModificationsFor': ['state', 'ctx', 'context'] }]
  },
  overrides: [{
    files: ["src/**/*"],
    parser: 'vue-eslint-parser',
    "parserOptions": {
      'parser': 'babel-eslint',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {},
  }],
};
