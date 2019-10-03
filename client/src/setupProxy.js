const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/coinbase/*', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/bittrex/*', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/poloniex/*', { target: 'http://localhost:5000/' }));
  app.use(proxy('/auth/google', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/current_user', { target: 'http://localhost:5000/' }));
  app.use(proxy('/api/logout', { target: 'http://localhost:5000/' }));
  //app.use(proxy('/api/coinbase/coins-ticker', { target: 'http://localhost:5000/' }));
};
