const SellingPartnerAPI = require("amazon-sp-api");

const refresh_token = process.env.REFRESH_TOKEN;

let sellingPartner = new SellingPartnerAPI({
  credentials: {
    SELLING_PARTNER_APP_CLIENT_ID: process.env.SELLING_PARTNER_APP_CLIENT_ID,
    SELLING_PARTNER_APP_CLIENT_SECRET:
      process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "eu", // The region to use for the SP-API endpoints ("eu", "na" or "fe")
  refresh_token: refresh_token, // The refresh token of your app user
});

const allMarketplacePartipants = async (req, res) => {
    try {
      await sellingPartner
        .callAPI({
          operation: "getMarketplaceParticipations",
          endpoint: "sellers",
        })
        .then((data) => {
          return res.json(data);
        });
    } catch (error) {
      return res.status(500).send();
    }
  };

  module.exports = {
    allMarketplacePartipants
  }