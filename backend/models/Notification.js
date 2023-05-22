const { string } = require('joi');
const mongoose = require('mongoose');

const instance = new mongoose.Schema(
  {
    email: {
      type: String,
      uniquired: true,
      required: true,
    },
    notificationList: [
      {
        fromEmail: {
          type: String,
          required: true
        },
        action: {
          type: String,
          required: true
        },
        content: {
          type: String
        },
        sku : {
          type: String,
        },
        currentPrice: {
          type: Number,
        },
        suggestedPrice: {
          type: Number
        }
      }
    ]
  }

);

const modelName = "Notification";

module.exports = mongoose.model(modelName, instance)