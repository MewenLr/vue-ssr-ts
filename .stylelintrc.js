module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'indentation': 2,
    'number-leading-zero': 'never',
    'block-opening-brace-space-before': null,
    'order/properties-alphabetical-order': null,
    'declaration-block-trailing-semicolon': 'never',
    'max-nesting-depth': [3, { 'ignore': ['pseudo-classes'] }],
  },
  ignoreFiles: [
    "src/assets/styles/mixins/**/*.sass"
  ]
}
