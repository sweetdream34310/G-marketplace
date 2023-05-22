import axios from 'axios'

const putPriceWithSkuArray = async ( sendData ) => {
  try {
    let res = await axios.post("api/spapi/putpricewithskuarray", sendData)
    return res.data
  } catch (error) {
    return 500;
  }
};

export { putPriceWithSkuArray };
