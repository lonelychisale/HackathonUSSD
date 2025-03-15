const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateRegistered: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Registration", registrationSchema);

module.exports = User;
