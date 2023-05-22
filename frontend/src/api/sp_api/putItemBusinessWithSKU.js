import axios from 'axios'

const putItemBusinessWithSKU = async ( sendData ) => {
  try {
    let res = await axios.post("api/spapi/putitembusinesswithsku", sendData)
    return res.data.status
  } catch (error) {
    return 500;
  }
};

export { putItemBusinessWithSKU };
