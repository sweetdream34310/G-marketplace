const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    taskContent: {
      type: String,
      required: true
    },
    status : {
      type: String,
      required: true,
      default: "new"
    }
  }
)

const modelName = "Task";

module.exports = mongoose.model(modelName, instance);