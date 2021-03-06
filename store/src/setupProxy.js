const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  let target = 'https://storage.sunnyhome.site';
  app.use(
    '/tok',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
    })
  );
  app.use(
    '/post0',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
    })
  );
  app.use(
    '/fs',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
    })
  );
};