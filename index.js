const express = require("express");
const passport = require("passport");
const keys = require("./config/keys");

require("./services/passport");

const app = express();

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth/coinbaseAuthRoutes")(app);
require("./routes/auth/googleAuthRoutes")(app);

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
