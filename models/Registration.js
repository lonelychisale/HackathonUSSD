const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  phoneNumber: String,
  name: String,
  email: String,
});

module.exports = mongoose.model("Registration", registrationSchema);