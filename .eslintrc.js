// Use this file as a starting point for your project's .eslintrc.
// Copy this file, and add rule overrides as needed.
module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: [
    'flowtype'
  ],
  rules: {
    'max-len': 'off',
    'no-useless-constructor': 'off'
  }
}
