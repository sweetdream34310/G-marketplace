import { MARKETPLACE_TYPES } from "./actionType";

const setMarketPlace = (data) => {
  const type = MARKETPLACE_TYPES.MARKETPLACE_SELECT;
  return { type, payload: data };
};

const isGetData = () => {
  const type = MARKETPLACE_TYPES.GET_DATA_SUCCESS;
  return { type, payload: data };
}
export default {
  setMarketPlace,
  isGetData
}
