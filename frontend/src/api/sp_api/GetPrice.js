import axios from 'axios'

const getPrice = async () => {
  try {
    await axios.get("api/spapi/getprice").then((res) => {
      return res.data;
    })
  } catch (error) {
    return 500;
  }
};

export { getPrice };
