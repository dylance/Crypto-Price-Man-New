const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/coinbase/*', { target: 'http://localhost:5000/' }));
  //app.use(proxy('/api/coinbase/coins-ticker', { target: 'http://localhost:5000/' }));
};