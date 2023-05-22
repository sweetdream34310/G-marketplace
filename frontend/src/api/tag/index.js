import axios from "axios";

const getAllTag = async (username, role) => {
  
  const data = {
    username: username,
    role: role
  }

  try {
    const res = await axios.post("api/tag/getall", data);
    return res.data
  } catch (error) {
    return 500;
  }
}

const updateTag = async (marketplace, sku, content, newTag, username) => {
  const data = {
    marketplace: marketplace,
    sku: sku,
    oldContent: content,
    tagContent: newTag,
    username : username
  }
  try {
    const res = await axios.post("api/tag/updatetag", data);
    return res.data
  } catch (error) {
    return 500;
  }
}

const deleteTag = async (marketplace, sku, content) => {
  const data = {
    marketplace: marketplace,
    sku: sku,
    tagContent: content
  }
  try {
    const res = await axios.post("api/tag/delete", data);
    return res.data
  } catch (error) {
    return 500
  }
}

const createTag = async (marketplace, sku, content, username) => {
  const data = {
    marketplace: marketplace,
    sku: sku,
    tagContent: content,
    username : username
  }
  try {
    const res = await axios.post("api/tag/createtag", data);
    return res.data;
  } catch (error) {
    return 500;
  }
}

export {
  createTag,
  updateTag,
  getAllTag,
  deleteTag
}