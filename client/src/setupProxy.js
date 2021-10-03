const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/coinbase/*', {
      target: 'http://localhost:5000/',
    })
  );
  app.use(
    createProxyMiddleware('/api/bittrex/*', {
      target: 'http://localhost:5000/',
    })
  );
  app.use(
    createProxyMiddleware('/api/poloniex/*', {
      target: 'http://localhost:5000/',
    })
  );
  app.use(
    createProxyMiddleware('/auth/google', { target: 'http://localhost:5000/' })
  );
  app.use(
    createProxyMiddleware('/api/current_user', {
      target: 'http://localhost:5000/',
    })
  );
  app.use(
    createProxyMiddleware('/api/logout', { target: 'http://localhost:5000/' })
  );
  app.use(
    createProxyMiddleware('/api/coinbase/sorted', {
      target: 'http://localhost:5000/',
    })
  );
  // app.use(proxy('/api/coinbase/coins-ticker', { target: 'http://localhost:5000/' }));
};
