import axios from 'axios'

const getItems = async (data) => {
  try {
    let res = await axios.post("api/spapi/getitems", data)
    return res.data;

  } catch (error) {
    return 500;
  }
};

export { getItems };
