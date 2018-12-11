const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const CoinbaseStrategy = require("passport-coinbase").Strategy
const mongoose = require('mongoose');
const keys = require("../config/keys");

const User = mongoose.model('users')


passport.serializeUser(function(user, done) {
  done(null, user.id); // the id from mongo, not profile.id. Id can be from different auth providers
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("The access token is:" , accessToken);
      console.log("The refresh token is:" , refreshToken);
      console.log("The profile token is:" , profile);
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if(existingUser) {
            return done(null, existingUser);
          } else {
            new User({ googleId: profile.id, name: profile.displayName })
              .save()
              .then(user => done(null, user));
          }
      })
    }
  )
);

passport.use(new CoinbaseStrategy({
    clientID: keys.coinbaseClientID,
    clientSecret: keys.coinbaseClientSecret,
    callbackURL: "http://localhost:5000/auth/coinbase/callback",
    scope: ["user"]
  },
  (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
    process.nextTick(() => {
      console.log("The profile is: ", profile.id)
      console.log("The profile is: ", profile)
      // To keep the example simple, the user's Coinbase profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Coinbase account with a user record in your database,
      // and return that user instead.

      User.findOne({ coinbaseId: profile.id })
        .then(existingUser => {
          if(existingUser) {
            return done(null, existingUser);
          } else {
            new User({ coinbaseId: profile.id, name: profile.displayName })
              .save()
              .then(user => done(null, user));
          }
      })
    });
  }
));
