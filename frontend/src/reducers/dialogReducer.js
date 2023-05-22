import { DIALOG_TYPES } from "../actions/actionType";

const initialState = {
  setDialogOpen: false
};

const dialogReducer = (state = initialState, action) => {

  switch(action.type) {
    case DIALOG_TYPES.DIALOG_OPEN:
      return {
        ...state,
        setDialogOpen : action.payload,
      };
    default:
      return state;
  }
}

export default dialogReducer;