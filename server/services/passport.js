const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ providerId: profile.id }, (err, user) => {
        if (user) {
          done(null, user);
        } else {
          User.create(
            {
              providerId: profile.id,
              providerName: "google",
              name: profile._json.name,
              image: profile._json.picture,
            },
            (err, user) => {
              done(null, user);
            }
          );
        }
      });
    }
  )
);
