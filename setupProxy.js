// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Đường dẫn của backend API
    createProxyMiddleware({
      target: 'http://localhost:8080', // Địa chỉ máy chủ backend
      changeOrigin: true,
    })
  );
};
