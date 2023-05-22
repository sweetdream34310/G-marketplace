const SellingPartnerAPI = require("amazon-sp-api");
const { putNotificationFunction } = require("../notification/index");

const { outstandingAcitivityFunction } = require("../../controllers/email");

const {
  getTag_PriceWithMarketplaceName,
  updatePrice,
  updateBusinessPrice,
} = require("../tag/index");

const { getAmazonDatabase, putAmazonDatabase } = require("../amazondata/index");

const { createLog } = require("../log/index");

const { allMarketplacePartipants } = require("./allMarketplacePartipants");
const { getItemWithAsin } = require("./getItemWithAsin");

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

let marketPlaces = [
  "Amazon.co.uk (UK)",
  "Amazon.de (Germany)",
  "Amazon.fr (France)",
  "Amazon.it (Italy)",
  "Amazon.es (Spain)",
  "Amazon.nl (Netherlands)",
  "Amazon.se (Sweden)",
  "Amazon.pl (Poland)",
  "Amazon.be (Belgium)",
  "Amazon.tr (Turkey)",
];

const setCurrency = (marketplaceName) => {
  let currency = "EUR";
  if (marketplaceName == "Amazon.co.uk (UK)") {
    currency = "GBP";
  } else if (marketplaceName == "Amazon.se (Sweden)") {
    currency = "SEK";
  } else if (marketplaceName == "Amazon.pl (Poland)") {
    currency = "PLN";
  } else if (marketplaceName == "Amazon.tr (Turkey)") {
    currency = "TRY";
  } else {
    currency = "EUR";
  }
  return currency;
};

const getPrice = async () => {
  try {
    await sellingPartner
      .callAPI({
        operation: "getPricing",
        endpoint: "productPricing",
        query: {
          MarketplaceId: "A1F83G8C2ARO7P",
          Asins: "B082KZRG12",
          ItemType: "Asin",
        },
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    return error;
  }
};

const putItemBusinessWithSKU = async (req, res) => {
  const sku = req.body.sku;
  const price = req.body.newPrice;
  const marketplaceName = req.body.marketplace;
  const email = req.body.email;
  const username = req.body.username;
  const oldPrice = req.body.oldPrice;

  let marketplaceId = getMarketplaceIdfromName(marketplaceName);
  // let currency = setCurrency(marketplaceName);
  try {
    const resData = await patchPrice(sku, marketplaceId, "GBP", price);

    if (resData.status == "ACCEPTED") {
      await updateBusinessPrice(marketplaceName, sku, price);

      await createLog(
        email,
        username,
        marketplaceName,
        sku,
        oldPrice,
        price,
        "business"
      );

      return res.status(200).json(resData);
    } else {
      return res.status(500).json(resData);
    }
  } catch (error) {
    return error;
  }
};

const patchPrice = async (sku, marketplaceId, currency, price) => {
  try {
    let resData = await sellingPartner.callAPI({
      operation: "patchListingsItem",
      endpoint: "listingsItems",
      path: {
        sellerId: process.env.SELLER_ID,
        sku: sku,
      },
      query: {
        marketplaceIds: marketplaceId,
      },
      body: {
        productType: "PRODUCT",
        patches: [
          {
            op: "replace",
            path: "/attributes/purchasable_offer",
            value: [
              {
                currency: currency,
                marketplace_id: marketplaceId,
                our_price: [
                  {
                    schedule: [
                      {
                        value_with_tax: parseFloat(price),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    return resData;
  } catch (error) {
    return error;
  }
};

const patchBusinessAndRetailPrice = async (
  sku,
  marketplaceId,
  retail_currency,
  business_currency,
  retail_price,
  business_price
) => {
  try {
    let resData = await sellingPartner.callAPI({
      operation: "patchListingsItem",
      endpoint: "listingsItems",
      path: {
        sellerId: process.env.SELLER_ID,
        sku: sku,
      },
      query: {
        marketplaceIds: marketplaceId,
      },
      body: {
        productType: "PRODUCT",
        patches: [
          {
            op: "replace",
            path: "/attributes/purchasable_offer",
            value: [
              {
                currency: currency,
                marketplace_id: marketplaceId,
                our_price: [
                  {
                    schedule: [
                      {
                        value_with_tax: parseFloat(price),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    return resData;
  } catch (error) {
    return error;
  }
};

const putItemWithSKU = async (req, res) => {
  const sku = req.body.sku;
  const price = req.body.newPrice;
  const marketplaceName = req.body.marketplace;
  const email = req.body.email;
  const username = req.body.username;
  const oldPrice = req.body.oldPrice;

  let marketplaceId = getMarketplaceIdfromName(marketplaceName);
  let currency = setCurrency(marketplaceName);
  // console.log(currency, '---------currency log');
  try {
    const resData = await patchPrice(sku, marketplaceId, currency, price);
    console.log(resData, "---------resdata");

    if (resData.status == "ACCEPTED") {
      await updatePrice(marketplaceName, sku, price);

      await createLog(
        email,
        username,
        marketplaceName,
        sku,
        oldPrice,
        price,
        "update"
      );

      return res.status(200).json(resData);
    } else {
      return res.status(500).json("error");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const priceValidation = (newValue, oldValue, role) => {
  const thresholdUp = oldValue * 1.15;
  const thresholdDown = oldValue * 0.85;

  if (newValue < thresholdUp && newValue > thresholdDown) return true;
  else return false;
};

const putPriceWithSkuArray = async (req, res) => {
  const data = req.body;

  const email = data.email;
  const username = data.username;

  const importedData = data.data;

  let groupData = [];
  let index = 0;

  await importedData.map(async (item) => {
    const firstFourLetter = item.sku.substring(0, 4);
    const amazonData = await getAmazonDatabase(item.Marketplace);

    amazonData.map(async (amazonDataItem) => {
      if (
        amazonDataItem.sku.substring(0, 4) == firstFourLetter &&
        amazonDataItem.fulfilType == item.fulfilType
      ) {
        const groupDataItem = {
          marketplace: item.Marketplace,
          sku: amazonDataItem.sku,
          retailPrice: item.retail_price,
          businessPrice: item.business_price,
          oldRetailPrice: amazonDataItem.price,
          oldBusinessPrice: amazonDataItem.businessPrice,
        };

        groupData.push(groupDataItem);
      }
    });
    index++;
    if (index == importedData.length) {
      let message = "";
      let resData = [];
      let count = 0;
      console.log(groupData, "----------groupdata");
      groupData.map(async (groupDataItem) => {
        if (
          (groupDataItem.businessPrice != "" ||
            groupDataItem.businessPrice != undefined) &&
          groupDataItem.marketplace != "Amazon.co.uk (UK)"
        ) {
          console.log("-------- business price has value");

          if (groupDataItem.businessPrice != groupDataItem.oldBusinessPrice) {
            const isPriceValid = priceValidation(
              groupDataItem.businessPrice,
              groupDataItem.oldBusinessPrice,
              ""
            );

            if (isPriceValid) {
              let marketplaceId = getMarketplaceIdfromName(
                groupDataItem.marketplace
              );
              let currency = "GBP";

              try {
                let resStatus = await patchPrice(
                  groupDataItem.sku,
                  marketplaceId,
                  currency,
                  groupDataItem.businessPrice
                );
                console.log(
                  resStatus,
                  "---------- business price update status"
                );

                message = resStatus.status;

                if (message == "ACCEPTED") {
                  await updateBusinessPrice(
                    groupDataItem.marketplace,
                    groupDataItem.sku,
                    groupDataItem.businessPrice
                  );
                  await createLog(
                    email,
                    username,
                    groupDataItem.marketplace,
                    groupDataItem.sku,
                    groupDataItem.oldBusinessPrice,
                    groupDataItem.businessPrice,
                    "business"
                  );
                }
              } catch (error) {
                message = "error";
              }

              resData.push({
                sku: groupDataItem.sku,
                message: message,
                Marketplace: groupDataItem.marketplace,
                action: "business",
              });
            } else {
              const notificationSaveStatus = await putNotificationFunction(
                email,
                "business",
                groupDataItem.marketplace,
                groupDataItem.sku,
                groupDataItem.oldBusinessPrice,
                groupDataItem.businessPrice
              );

              if (notificationSaveStatus) {
                resData.push({
                  sku: groupDataItem.sku,
                  message: "check",
                  Marketplace: groupDataItem.marketplace,
                  action: "business",
                });
              } else {
                resData.push({
                  sku: groupDataItem.sku,
                  message: "error",
                  Marketplace: groupDataItem.marketplace,
                  action: "business",
                });
              }
            }
          }
        }

        if (
          groupDataItem.retailPrice != "" ||
          groupDataItem.retailPrice != undefined
        ) {
          if (groupDataItem.retailPrice != groupDataItem.oldRetailPrice) {
            console.log("-------- retail price has value");
            const isPriceValid = priceValidation(
              groupDataItem.retailPrice,
              groupDataItem.oldRetailPrice,
              ""
            );
            if (isPriceValid) {
              let marketplaceId = getMarketplaceIdfromName(
                groupDataItem.marketplace
              );
              let currency = setCurrency(groupDataItem.marketplace);

              try {
                let resStatus = await patchPrice(
                  groupDataItem.sku,
                  marketplaceId,
                  currency,
                  groupDataItem.retailPrice
                );
                console.log(resStatus, "---------- retail price update status");
                message = resStatus.status;

                if (message == "ACCEPTED") {
                  await updatePrice(
                    groupDataItem.marketplace,
                    groupDataItem.sku,
                    groupDataItem.retailPrice
                  );
                  await createLog(
                    email,
                    username,
                    groupDataItem.marketplace,
                    groupDataItem.sku,
                    groupDataItem.oldRetailPrice,
                    groupDataItem.retailPrice,
                    "update"
                  );
                }
              } catch (error) {
                message = "error";
              }

              resData.push({
                sku: groupDataItem.sku,
                message: message,
                Marketplace: groupDataItem.marketplace,
                action: "retail",
              });
            } else {
              const notificationSaveStatus = await putNotificationFunction(
                email,
                "price",
                groupDataItem.marketplace,
                groupDataItem.sku,
                groupDataItem.oldBusinessPrice,
                groupDataItem.businessPrice
              );

              if (notificationSaveStatus) {
                resData.push({
                  sku: groupDataItem.sku,
                  message: "check",
                  Marketplace: groupDataItem.marketplace,
                  action: "retail",
                });
              } else {
                resData.push({
                  sku: groupDataItem.sku,
                  message: "error",
                  Marketplace: groupDataItem.marketplace,
                  action: "retail",
                });
              }
            }
          }
        }

        count++;

        if (count == groupData.length) {
          await outstandingAcitivityFunction(email, resData);

          return res.json({
            data: resData,
          });
        }
      });
    }
  });
};

const getMarketplaceIdfromName = (marketplaceName) => {
  let marketplaceID = "";
  if (marketplaceName == "Amazon.co.uk (UK)") {
    marketplaceID = "A1F83G8C2ARO7P";
  } else if (marketplaceName == "Amazon.de (Germany)") {
    marketplaceID = "A1PA6795UKMFR9";
  } else if (marketplaceName == "Amazon.fr (France)") {
    marketplaceID = "A13V1IB3VIYZZH";
  } else if (marketplaceName == "Amazon.it (Italy)") {
    marketplaceID = "APJ6JRA9NG5V4";
  } else if (marketplaceName == "Amazon.es (Spain)") {
    marketplaceID = "A1RKKUPIHCS9HS";
  } else if (marketplaceName == "Amazon.nl (Netherlands)") {
    marketplaceID = "A1805IZSGTT6HS";
  } else if (marketplaceName == "Amazon.se (Sweden)") {
    marketplaceID = "A2NODRKZP88ZB9";
  } else if (marketplaceName == "Amazon.pl (Poland)") {
    marketplaceID = "A1C3SOZRARQ6R3";
  } else if (marketplaceName == "Amazon.be (Belgium)") {
    marketplaceID = "AMEN7PMS3EDWL";
  } else if (marketplaceName == "Amazon.tr (Turkey)") {
    marketplaceID = "A33AVAJ2PDY3EV";
  }
  return marketplaceID;
};

const getItemsWithMarketplaceID = async (marketplaceId) => {
console.log("------start")

  let documentID = "";
  try {
    /////createReport
    let createReport = await sellingPartner.callAPI({
      operation: "createReport",
      endpoint: "reports",
      body: {
        marketplaceIds: [marketplaceId],
        reportType: "GET_MERCHANT_LISTINGS_ALL_DATA",
      },
    });

    /////////////get report id
    const getReportDocumentID = async () => {
      let docID = "";

      let getReport = await sellingPartner.callAPI({
        operation: "getReport",
        endpoint: "reports",
        path: {
          reportId: createReport.reportId,
        },
      });

      if (getReport.processingStatus == "DONE") {
        docID = getReport.reportDocumentId;
        documentID = docID;
        return true;
      } else {
        await getReportDocumentID();
      }
    };

    await getReportDocumentID();

    //get document
    let document = await sellingPartner.callAPI({
      operation: "getReportDocument",
      endpoint: "reports",
      path: {
        reportDocumentId: documentID,
      },
    });

    let report = await sellingPartner.download(document, {
      json: true,
    });

    console.log(report)
    // return data
    const resData = report.map((item) => {
      let fulfilType = "AMAZON_EU";

      if (item["fulfilment-channel"] == "DEFAULT") {
        fulfilType = "MERCHANT";
      } else {
        fulfilType = item["fulfilment-channel"];
      }

      return {
        name: item["item-name"],
        sku: item["seller-sku"],
        price: item.price,
        asin: item.asin1,
        fulfilType: fulfilType,
      };
    });

    return resData;
  } catch (error) {
    console.log("---error",error)
    return "error";
  }
};

const getBusinessItemsWithMarketplaceID = async (marketplaceId) => {
  let documentID = "";
  try {
    /////createReport
    let createReport = await sellingPartner.callAPI({
      operation: "createReport",
      endpoint: "reports",
      body: {
        marketplaceIds: [marketplaceId],
        reportType: "GET_FLAT_FILE_OPEN_LISTINGS_DATA",
      },
    });

    /////////////get report id
    const getReportDocumentID = async () => {
      let docID = "";

      let getReport = await sellingPartner.callAPI({
        operation: "getReport",
        endpoint: "reports",
        path: {
          reportId: createReport.reportId,
        },
      });

      if (getReport.processingStatus == "DONE") {
        docID = getReport.reportDocumentId;
        documentID = docID;
        return true;
      } else {
        await getReportDocumentID();
      }
    };

    await getReportDocumentID();

    //get document
    let document = await sellingPartner.callAPI({
      operation: "getReportDocument",
      endpoint: "reports",
      path: {
        reportDocumentId: documentID,
      },
    });

    let report = await sellingPartner.download(document, {
      json: true,
    });

    console.log(report)
    // return data
    const resData = {};

    report.map((item) => {
      resData[item.sku] = item["Business Price"];
      // return {
      //   [item.sku]: item['Business Price'],
      // }
    });

    return resData;
  } catch (error) {
    return "error";
  }
};

// amazon data save function
const setMockAmazonData = async () => {
  marketPlaces.map(async (marketplaceName) => {
    let marketplaceID = getMarketplaceIdfromName(marketplaceName);

    let content = await getItemsWithMarketplaceID(marketplaceID);

    let businessPrice = await getBusinessItemsWithMarketplaceID(marketplaceID);

    // console.log(businessPrice, marketplaceName)
    await putAmazonDatabase(marketplaceName, content, businessPrice);
    console.log(`${marketplaceName} database updated.`);
  });
};

const getItems = async (req, res) => {
  // get marketplace id from marketplace name
  let marketplaceID = "";
  const marketplaceName = req.body.marketplaceName;
  marketplaceID = getMarketplaceIdfromName(marketplaceName);

  try {
    let getAmazonData = await getAmazonDatabase(marketplaceName);

    let tag_price = await getTag_PriceWithMarketplaceName(marketplaceName);

    let resData = [...getAmazonData];

    if (getAmazonData == []) {
      return res.json({
        data: getAmazonData,
      });
    }

    tag_price.map(async (tag_item) => {
      getAmazonData.forEach(async (sp_item) => {
        if (sp_item.sku == tag_item.sku) {
          // if (sp_item.price == tag_item.suggestedPrice || sp_item.businessPrice == tag_item.suggestedBusinessPrice) {
          if (sp_item.price == tag_item.suggestedPrice) {
            await updatePrice(marketplaceName, sp_item.sku, "");
            sp_item.suggestedPrice = "";
          } else {
            sp_item._doc = {
              ...sp_item._doc,
              suggestedPrice: tag_item.suggestedPrice,
            };
          }
          if (sp_item.businessPrice == tag_item.suggestedBusinessPrice) {
            await updateBusinessPrice(marketplaceName, sp_item.sku, "");
            sp_item.businessPrice = "";
          } else {
            sp_item._doc = {
              ...sp_item._doc,
              suggestedBusinessPrice: tag_item.suggestedBusinessPrice,
            };
          }
          // }

          if (tag_item.username != undefined && tag_item.tagContent != "") {
            sp_item._doc = {
              ...sp_item._doc,
              tag: `@${tag_item.username} : ${tag_item.tagContent}`,
            };
          }
        }
      });
    });

    return res.json({
      data: resData,
    });
  } catch (error) {
    return res.json({
      data: "error",
    });
  }
};

//////////refresh tempdata per 10 min
// setMockAmazonData();
// setInterval(setMockAmazonData, 10 * 60 * 1000);
// getItemsWithMarketplaceID('A1PA6795UKMFR9');

const patchBusinessAndRetailPriceTest = async (
  sku,
  marketplaceId,
  retail_currency,
  retail_price
) => {
  try {
    let resData = await sellingPartner.callAPI({
      operation: "patchListingsItem",
      endpoint: "listingsItems",
      path: {
        sellerId: process.env.SELLER_ID,
        sku: sku,
      },
      query: {
        marketplaceIds: marketplaceId,
      },
      body: {
        productType: "PRODUCT",
        patches: [
          {
            op: "replace",
            path: "/attributes/purchasable_offer",
            value: [
              {
                currency: retail_currency,
                marketplace_id: marketplaceId,
                our_price: [
                  {
                    schedule: [
                      {
                        value_with_tax: parseFloat(retail_price),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    return resData;
  } catch (error) {
    return error;
  }
};


// patchBusinessAndRetailPriceTest("259_Brush_Head_Hrd_4", "A1F83G8C2ARO7P", "GBP")
// getBusinessItemsWithMarketplaceID('A1PA6795UKMFR9')
getItemsWithMarketplaceID("A1PA6795UKMFR9")
module.exports = {
  getPrice,
  putItemWithSKU,
  putItemBusinessWithSKU,
  getItemWithAsin,
  allMarketplacePartipants,
  getItems,
  putPriceWithSkuArray,
};
