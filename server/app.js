const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const keys = require("./keys");
const app = express();
const passport = require("passport");
const passportStrategy = require("./middleware/passport-strategy");

mongoose
  .connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo Connected"))
  .catch(e => console.log(e));

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
