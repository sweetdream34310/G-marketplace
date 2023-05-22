import axios from 'axios'

const getItemWithAsin = async () => {
  try {
    await axios.get("api/spapi/getasinitem").then((res) => {
      return res.data;
    })
  } catch (error) {
    return 500;
  }
};

export { getItemWithAsin };
