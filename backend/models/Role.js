const { string } = require("joi");
const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    rolename: {
      type: String,
      uniquired: true,
      required: true,
    },
    permissions: []
  },
  {
    timestamps: true,
  }
);

const modelName = "Role";

module.exports = mongoose.model(modelName, instance);