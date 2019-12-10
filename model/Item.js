const mongoose = require("mongoose");

const newItem = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = mongoose.model("Item", newItem);

module.exports = Item;
