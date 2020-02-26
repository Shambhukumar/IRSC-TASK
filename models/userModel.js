const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "A User should have a Name"]
  },
  lastname: {
    type: String,
    required: [true, "A User should have a Name"]
  },
  email: {
    type: String,
    required: [true, "A user should have a Name"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide a valid Email"]
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a confirm Password"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Password are not the same!"
    }
  },
  role: {
    type: String,
    enum: ["customer", "hotel"],
    default: "customer"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
