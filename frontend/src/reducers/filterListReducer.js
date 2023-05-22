import { FILTER_TYPES } from "../actions/actionType";

const initialState = {
  setFilterList: [],
  setSkuSelect: [],
  setAsinSelect: [],
  setFulfilSelect: [],
};

const filterReducer = (state = initialState, action) => {

  switch (action.type) {
    case FILTER_TYPES.FILTER_LIST:
      return {
        ...state,
        setFilterList: action.payload,
      };
    case FILTER_TYPES.SKU_SELECT:
      return {
        ...state,
        setSkuSelect: action.payload,
      };
    case FILTER_TYPES.ASIN_SELECT:
      return {
        ...state,
        setAsinSelect: action.payload,
      };
    case FILTER_TYPES.FULFIL_SELECT:
      return {
        ...state,
        setFulfilSelect: action.payload,
      };
    default:
      return state;
  }
}


export default filterReducer;