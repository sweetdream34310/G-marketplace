import { DIALOG_TYPES } from "./actionType";

const setOpenDialog = (data) => {
  const type = DIALOG_TYPES.DIALOG_OPEN;
  return { type, payload: data };
};

export default {
    setOpenDialog
}
