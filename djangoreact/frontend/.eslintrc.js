module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'no-param-reassign': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [
      'off',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression',
      },
    ],
  },
};
