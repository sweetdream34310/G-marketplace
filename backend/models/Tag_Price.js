const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    marketplace: {
      type: String,
      required: true
    },
    sku : {
      type: String,
      required: true
    },
    suggestedPrice:{
      type: Number,
    },
    suggestedBusinessPrice:{
      type: Number,
    },
    tagContent: {
      type: String,
    },
    username : {
      type: String,
    }
  }
)

const modelName = "Tag_Price";

module.exports = mongoose.model(modelName, instance);