const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  providerId: String,
  providerName: String,
  name: String,
  image: String,
});

module.exports = mongoose.model("user", userSchema);
