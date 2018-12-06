const passport = require("passport");

module.exports = app => {
  app.get('/auth/coinbase', passport.authenticate('coinbase', {

    })
  );

  app.get('/auth/coinbase/callback',
    passport.authenticate('coinbase', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user || "you are not logged in!");
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
}
