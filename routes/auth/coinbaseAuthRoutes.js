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
}
