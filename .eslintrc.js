module.exports = {
  root: true,
  env: {
    'node': true,
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': './webpack/webpack.config.js',
      },
    },
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'airbnb-base',
    '@vue/typescript',
  ],
  parserOptions: {
    'ecmaVersion': 2020,
  },
  rules: {
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
