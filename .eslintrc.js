module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-confusing-void-expression": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
    "@typescript-eslint/no-extraneous-class": "warn",
  },
};
