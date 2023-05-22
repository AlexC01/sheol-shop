module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "standard-with-typescript",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "import/no-unresolved": [
      "error",
      {
        plugins: [
          "module-resolver",
          {
            alias: {
              "@routes": "./src/routes",
              "@constants": "./src/constants",
              "@helpers": "./src/helpers",
              "@interfaces": "./src/interfaces",
              "@middleware": "./src/middleware",
              "@models": "./src/models"
            }
          }
        ]
      }
    ]
  },
  globals: { process: true, __dirname: true }
};
