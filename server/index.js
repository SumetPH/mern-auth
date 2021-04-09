require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const routeAuth = require("./routes/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./services/passport");

// connect db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  cookieSession({
    name: "auth",
    keys: ["sumetph"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// routes
app.use(routeAuth);

app.listen(PORT, console.log(`http://localhost:${PORT}`));
