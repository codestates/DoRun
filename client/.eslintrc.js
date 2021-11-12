module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended'][
    ('eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended')
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
};
