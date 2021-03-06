module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack/webpack.prod.js',
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
  },
  overrides: [
    { /* js */
      files: ['*.js'],
      extends: [
        'airbnb-base',
      ],
      globals: {
        window: true,
      },
      rules: {
        'no-return-assign': 'off',
        semi: ['error', 'never'],
        'no-underscore-dangle': 'off',
        'prefer-promise-reject-errors': 'off',
        'no-param-reassign': ['error', { props: false }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      },
    },
    { /* ts, vue */
      files: ['*.ts', '*.vue'],
      parser: 'vue-eslint-parser',
      extends: [
        'plugin:vue/strongly-recommended',
        'airbnb-base',
        '@vue/typescript/recommended',
      ],
      parserOptions: { parser: '@typescript-eslint/parser' },
      plugins: ['vue', '@typescript-eslint'],
      rules: {
        'func-names': 'off',
        'no-return-await': 'error',
        semi: ['error', 'never'],
        'class-methods-use-this': 'off',
        'max-len': ['error', { code: 150 }],
        'lines-between-class-members': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-inferrable-types': 'off',
        'no-param-reassign': ['error', { props: false }],
        'padded-blocks': ['error', { classes: 'always' }],
        'import/extensions': ['error', { ts: 'never', vue: 'always' }],
        '@typescript-eslint/ban-types': ['error', {
          types: {
            object: false,
            Function: false,
          },
        },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: true, peerDependencies: true }],
      },
    },
    { /* test */
      files: [
        '**/src/**/*.test.{j,t}s?(x)',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
      env: {
        jest: true,
      },
    },
  ],
}
