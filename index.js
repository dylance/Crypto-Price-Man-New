const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User"); // User must come before passport
require("./services/passport");

mongoose.connect(keys.mongoURI , { useNewUrlParser: true });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] // cookies session encrypts the key
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth/coinbaseAuthRoutes")(app);
require("./routes/auth/googleAuthRoutes")(app);
require("./routes/api/coinbase")(app);
require("./routes/api/bittrex")(app);
require("./routes/api/poloniex")(app);

app.use(express.static(__dirname + '/public'))

//if (process.env.NODE_ENV === "production") {
  // Express will serve production assets if they exist
  app.use(express.static("client/build"));


  // Express will serve index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
//}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
