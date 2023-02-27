const { createProxyMiddleware } = require('http-proxy-middleware');
const URL = 'http://54.206.156.177:8080'
// const URL = "http://localhost:8080"
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: URL,
      changeOrigin: true,
    })
  );
};