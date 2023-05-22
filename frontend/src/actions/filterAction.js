import { FILTER_TYPES } from "./actionType";

const setFilterList = (data) => {
  const type = FILTER_TYPES.FILTER_LIST;
  return { type, payload: data };
};

const setSkuSelect = (data) => {
  const type = FILTER_TYPES.SKU_SELECT;
  return { type, payload: data };
}

const setAsinSelect = (data) => {
  const type = FILTER_TYPES.ASIN_SELECT;
  return { type, payload: data };
}

const setFulfilSelect = (data) => {
  const type = FILTER_TYPES.FULFIL_SELECT;
  return {type, payload: data};
}

export default {
  setFilterList,
  setSkuSelect,
  setAsinSelect,
  setFulfilSelect
}
