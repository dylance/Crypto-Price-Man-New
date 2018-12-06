const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User"); // User must come before passport

require("./services/passport");

mongoose.connect(keys.mongoURI , { useNewUrlParser: true });

const app = express();

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth/coinbaseAuthRoutes")(app);
require("./routes/auth/googleAuthRoutes")(app);
require("./routes/api/coinbase")(app);

// app.get('/api/coinbase', (req, res) => {
//   // axios.get('https://api.coinbase.com/v2/currencies')
//   //   .then(function (response) {
//   //     console.log(response);
//   //     res.write(response.body);
//   //   })
//   //   .catch(function (error) {
//   //     console.log(error);
//   //   });
//   res.write("hello")
// })


app.use(express.static(__dirname + '/public'))

if (process.env.NODE_ENV === "production") {
  // Express will serve production assets if they exist
  app.use(express.static("client/build"));


  // Express will serve index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
