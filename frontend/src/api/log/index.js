import axios from 'axios'

const getLogs = async () => {
  try {
    const res = await axios.post("api/log/getlogs");
    return res.data;
  } catch (error) {
    return 500;
  }
};

const getLog = async (marketplace, sku) => {
  const data = {
    marketplace : marketplace,
    sku : sku
  }
  try {
    const res = await axios.post("api/log/getlog", data);
    return res.data
  } catch (error) {
    return 500;    
  }
}

export {
  getLogs,
  getLog
}