module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'object-curly-newline': [0],
    'react/jsx-props-no-spreading': [0],
    'max-len': [1, 150],
    'no-param-reassign': [1],
    'no-multiple-empty-lines': [1, { max: 2 }],
    'react/jsx-filename-extension': [0],
  },
};
