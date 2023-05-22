module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
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
  ]
};
