module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.ts', '*.test.tsx'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
      },
    },
  ],
};
