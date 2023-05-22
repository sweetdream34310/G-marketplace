import axios from 'axios'

const getMarketplaceParticipations = async () => {
  try {
    await axios.get("api/spapi/getmarketplaceparticipations").then((res) => {
      return res.data;
    })
  } catch (error) {
    return 500;
  }
};

export { getMarketplaceParticipations };
