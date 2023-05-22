import { ROUTER_SELECTED_TYPES } from "../actions/actionType";

const initialState = {
  selectedRouterTitle: 'Dashboard',
};

const routerReducer = (state = initialState, action) => {

  switch (action.type) {
    case ROUTER_SELECTED_TYPES.ROUTER_SELECTED_TITLE:
      return {
        ...state,
        selectedRouterTitle: action.payload,
      };
    default:
      return state;
  }
}


export default routerReducer;