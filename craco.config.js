const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
   webpack: {
      alias: {
         "@": path.resolve(__dirname, "src"),
      },
   },
   eslint: {
      configure: {
         rules: {
            "react-hooks/exhaustive-deps": "off",
         },
      },
   },
   devServer: {
      port: 5000,
   },
};
