import axios from 'axios'

const putItemWithSKU = async ( sendData ) => {
  try {
    let res = await axios.post("api/spapi/putitemwithsku", sendData)
    return res.data.status
  } catch (error) {
    return 500;
  }
};

export { putItemWithSKU };
