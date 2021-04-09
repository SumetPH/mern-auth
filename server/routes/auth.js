const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const authCheck = require("../middlewares/authCheck");

router.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLICENT_HOST,
    successRedirect: process.env.CLICENT_HOST + "/profile",
  })
);

router.get("/api/auth/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLICENT_HOST);
});

router.get("/api/user", authCheck, (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

module.exports = router;
