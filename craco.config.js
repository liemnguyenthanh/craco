const path = require("path");

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
};
