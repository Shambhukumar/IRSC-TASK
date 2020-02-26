const mongoose = require("mongoose");
const validator = require("validator");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Every hotel must have a name"]
  },
  city: {
    type: String,
    required: [true, "Every hotel must have a state"]
  },

  date: {
    type: Date,
    required: [true, "Every hotel must have availeble date"]
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"]
  }
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
