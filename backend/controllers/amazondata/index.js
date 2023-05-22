const AmazonData = require('../../models/AmazonData')

const putAmazonDatabase = async (marketplaceName, content, businessPrice) => {
  try {
    const amazonData = await AmazonData.findOne({ marketplaceName: marketplaceName })

    content.map((item) => {
      item.businessPrice = businessPrice[item.sku]
    })

    if (amazonData) {
      amazonData.content = content;

      await amazonData.save();
    } else {
        const newAmazonData = new AmazonData({

        marketplaceName: marketplaceName,
        content: content
      })

      await newAmazonData.save()
    
    }
    return true
  } catch (error) {
    console.log(error)
    return false
  }

 }

const getAmazonDatabase = async (marketplaceName) => {

  let res = [];

  try {
    const amazonData = await AmazonData.findOne({ marketplaceName: marketplaceName });

    if (!amazonData) {
      res = [];
    }else {
      res = amazonData.content;
    }

    return res
  } catch (error) {
    console.log(error)
    return [];
  }
}

module.exports = {
  getAmazonDatabase,
  putAmazonDatabase
}