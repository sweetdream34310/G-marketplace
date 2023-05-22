const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role:{
      type: String,
      required: true,
      default: "user"
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "User";

module.exports = mongoose.model(modelName, instance);