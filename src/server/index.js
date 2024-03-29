const express = require('express');
const keys = require('./config/keys');

const app = express();

require('./api/routes/auth/coinbaseAuthRoutes')(app);
require('./api/routes/auth/googleAuthRoutes')(app);
require('./api/routes/api/coinbase')(app);
require('./api/routes/api/bittrex')(app);
require('./api/routes/api/poloniex')(app);

//app.use(express.static(__dirname + '/public'))

//if (process.env.NODE_ENV === "production") {
// Express will serve production assets if they exist
app.use(express.static('../../../client/build'));

// Express will serve index.html file if it doesn't recognize the route
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
//}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
