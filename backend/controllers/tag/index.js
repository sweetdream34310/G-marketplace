const Tag_Price = require("../../models/Tag_Price");
const bcrypt = require('bcrypt')

const getAll = async (req, res) => {
  const { username, role } = req.body;
  try {
    const tags = await Tag_Price.find();
    let resData = [];
    tags.map((item, index) => {
      if (item.tagContent != undefined && item.tagContent != '') {
        if (role == "admin") {
          resData.push(item)
        } else {
          if (item.username == username) {
            resData.push(item)
          }
        }
      }
    })

    return res.status(201).json({
      message: "Success",
      data: resData
    })
  } catch (error) {
    res.json('error');
  }
}

const updatePrice = async (marketplaceName, sku, price) => {

  try {
    const tagPrice = await Tag_Price.findOne({ marketplace: marketplaceName, sku: sku });
    if (!tagPrice) {
      const newtagPrice = new Tag_Price({
        marketplace: marketplaceName,
        sku: sku,
        suggestedPrice: price,
      })
      await newtagPrice.save()
      return true;
    } else {
      tagPrice.suggestedPrice = price;
      await tagPrice.save();
      return true
    }
  } catch (error) {
    return false;
  }
}

const updateBusinessPrice = async (marketplaceName, sku, businessPrice) => {
  try {
    const tagPrice = await Tag_Price.findOne({ marketplace: marketplaceName, sku: sku });
    if (!tagPrice) {
      const newtagPrice = new Tag_Price({
        marketplace: marketplaceName,
        sku: sku,
        suggestedBusinessPrice: businessPrice,
      })
      await newtagPrice.save()
      return true;
    } else {
      tagPrice.suggestedBusinessPrice = businessPrice;
      await tagPrice.save();
      return true
    }
  } catch (error) {
    return false;
  }
}

const updatetag = async (req, res) => {
  const { marketplace, sku, oldContent, tagContent, username } = req.body
  try {
    const tag = await Tag_Price.findOne({ marketplace: marketplace, sku: sku, tagContent: oldContent })

    if (!tag) {
      return res.json(`There is no tag with ${oldContent}`)
    } else {
      tag.tagContent = tagContent;
      tag.username = username
      await tag.save();
      return res.json('success');
    }
  } catch (error) {
    res.json(error)
  }
}

const createtag = async (req, res) => {
  const { marketplace, sku, tagContent, username } = req.body;
  try {
    const tag = await Tag_Price.findOne({ marketplace: marketplace, sku: sku, tagContent: tagContent, username: username })

    if (tag) {
      return res.json(
        'This tag already exist.'
      )
    }

    const updateTag = await Tag_Price.findOne({ marketplace: marketplace, sku: sku })

    if (updateTag) {
      updateTag.tagContent = tagContent,
        updateTag.username = username

      await updateTag.save();

      return res.json('success');
    }

    const newtag = new Tag_Price({
      marketplace: marketplace,
      sku: sku,
      tagContent: tagContent,
      username: username
    })

    await newtag.save();

    return res.json('success');

  } catch (error) {
    return res.json(error)
  }
}

const deletetag = async (req, res) => {

  const { marketplace, sku, tagContent } = req.body;

  try {
    const tag = await Tag_Price.findOne({ marketplace: marketplace, sku: sku, tagContent: tagContent })

    if (!tag) {
      return res.json(`There is no tag with ${tagContent}`)
    }

    if (tag.suggestedPrice == undefined && tag.suggestedPrice == '') {
      await tag.delete();
    } else {
      tag.tagContent = ''
      tag.username = ''
      await tag.save();
    }

    return res.json('success');

  } catch (error) {
    return res.json(error)
  }
}

const getTag_PriceWithMarketplaceName = async (marketplaceName) => {
  try {
    const tag_price = await Tag_Price.find({ marketplace: marketplaceName })

    if (!tag_price) {
      return [];
    } else {
      return tag_price;
    }
  } catch (error) {
    return [];
  }
}

// const deleteAllTag = async () => {
//   await Tag_Price.remove();
// }

// deleteAllTag()

module.exports = {
  getAll,
  createtag,
  updatetag,
  deletetag,
  getTag_PriceWithMarketplaceName,
  updatePrice,
  updateBusinessPrice
}