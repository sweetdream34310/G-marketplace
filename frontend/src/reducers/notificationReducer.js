import { NOTIFICATION_TYPES } from "../actions/actionType";

const initialState = {
  notificationStatus: false,
};

const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
    case NOTIFICATION_TYPES.NOTIFICATION_TYPES:
      return {
        ...state,
        notificationStatus: action.payload,
      };
    default:
      return state;
  }
}


export default notificationReducer;