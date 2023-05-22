import { NOTIFICATION_TYPES } from "./actionType";

const setNotificationStatus = (data) => {
  const type = NOTIFICATION_TYPES.NOTIFICATION_TYPES;
  return { type, payload: data };
};

export default {
    setNotificationStatus
}
