import { MARKETPLACE_TYPES, PRICE_UPDATE_REQ_STATUS } from "../actions/actionType";

let initialState = {
  setMarketPlace: '',
  isGetData: false,
  importData: [],
  spData: [],
  importDataName: '',
  priceRequestStatus: false
};

const marketplaceReducer = (state = initialState, action) => {

  switch (action.type) {
    case MARKETPLACE_TYPES.MARKETPLACE_SELECT:
      return {
        ...state,
        setMarketPlace: action.payload,
      };
    case MARKETPLACE_TYPES.GET_DATA_SUCCESS:
      return {
        ...state,
        isGetData: action.payload
      };
    case MARKETPLACE_TYPES.GET_IMPORT_DATA:
      return {
        ...state,
        importData: action.payload
      };
    case MARKETPLACE_TYPES.GET_IMPORT_DATA_NAME:
      return {
        ...state,
        importDataName: action.payload
      };
    case MARKETPLACE_TYPES.GET_SP_DATA:
      return {
        ...state,
        spData: action.payload                                                                  
      };
    case PRICE_UPDATE_REQ_STATUS.PRICE_UPDATE_REQ_STATUS:
      return {
        ...state,
        priceRequestStatus: action.payload
      }
    default:
      return state;
  }
}


export default marketplaceReducer;