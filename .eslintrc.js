module.exports = {
  root: true,
  env: {
    // 'browser': true,
    // 'es6': true,
    // 'mocha': true,
    'node': true,
    // 'jest': true,
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': './webpack/webpack.config.js',
      },
    },
  },
  extends: [
    // 'plugin:vue/essential',
    // '@vue/airbnb',
    // '@vue/typescript/recommended',

    'plugin:vue/strongly-recommended',
    'airbnb-base',
    '@vue/typescript',
  ],

  // globals: {
  //   'Atomics': 'readonly',
  //   'SharedArrayBuffer': 'readonly',
  //   'expect': true,
  // },
  // parser: 'vue-eslint-parser',

  parserOptions: {
    'ecmaVersion': 2020,

    // 'sourceType': 'module',
    // 'parser': 'babel-eslint',
    // 'project': './tsconfig.json',
    // 'allowImportExportEverywhere': true,
    // 'ecmaFeatures': { legacyDecorators: true },

  },

  // plugins: ['vue'],

  rules: {
    // 'linebreak-style': 'off',
    'no-return-assign': 'off',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-underscore-dangle': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'no-param-reassign': ['error', {'props': true, 'ignorePropertyModificationsFor': ['state', 'ctx', 'context'] }]
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: 'vue-eslint-parser',
      parserOptions: { 'parser': '@typescript-eslint/parser' },
      plugins: ['vue', '@typescript-eslint'],
      rules: {
        'import/extensions': ['error', { 'ts': 'never', 'vue': 'always' }],
      },
    },
    {
      files: ['*.test.(j|t)s?'],
      env: {
        jest: true,
      },
    },
  ],
};
