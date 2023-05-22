const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    marketplace: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    suggestedPrice: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "Log";

module.exports = mongoose.model(modelName, instance);