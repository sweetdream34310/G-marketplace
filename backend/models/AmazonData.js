const { string } = require('joi');
const mongoose = require('mongoose');

const instance = new mongoose.Schema(
  {
    marketplaceName: {
      type: String,
      uniquired: true,
      required: true,
    },
    content: [
      {
        name: {
          type: String,
        },
        sku: {
          type: String,
        },
        price: {
          type: Number
        },
        businessPrice: {
          type: Number
        },
        asin : {
          type: String,
        },
        fulfilType: {
          type: String,
        }
      }
    ]
  }

);

const modelName = "AmazonData";

module.exports = mongoose.model(modelName, instance)