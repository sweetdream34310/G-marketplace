const Log = require("../../models/Log");
const bcrypt = require('bcrypt')
const { signToken } = require('../../middleware/authMiddleware')

const getLogs = async (req, res) => {
  try {
    const logs = await Log.find();

    if (logs.length == 0) {
      return res.json({
        message: 'no logs'
      })
    }

    return res.json({
      message: 'success',
      data: logs
    })
  }
  catch (error) {
    return res.json({
      message: 'error'
    });
  }
}

const getLog = async (req, res) => {
  const {marketplace, sku} = req.body

  try {
    const logs = await Log.find({ marketplace: marketplace, sku: sku});

    if (logs.length == 0) {
      return res.json({
        message: 'no logs'
      })
    }

    return res.json({
      message: 'success',
      data: logs
    })
  }
  catch (error) {
    return res.json({
      message: 'error'
    });
  }
}

const createLog = async (email, username, marketplacename, sku, oldPrice, newPrice, action) => {

  try {
    const newLog = new Log({
      action: action,
      email: email,
      username: username,
      marketplace: marketplacename,
      sku: sku,
      price: oldPrice,
      suggestedPrice: newPrice
    })

    await newLog.save();

    return true;
  } catch (error) {
    return false
  }
}

// const deleteAllLog = async () => {
//   await Log.remove();
// }

// deleteAllLog()

module.exports = {
  getLogs,
  getLog,
  createLog
}