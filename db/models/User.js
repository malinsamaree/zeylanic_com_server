const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  subDomain: {
    type: String,
    required: true,
  },
  customDomain: {
    type: String,
    required: true,
  },
  isSubDomainActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  contribution: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
