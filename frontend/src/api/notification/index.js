import axios from 'axios'

const getNotification = async (data) => {
  try {
    const res = await axios.post("api/notification/getnotification", data);
    return res.data;
  } catch (error) {
    return 500;
  }
}

const putNotification = async (data) => {
  try {
    const res = await axios.post("api/notification/putnotification", data);
    return res.data;
  } catch (error) {
    return 500;
  }
}

const deleteNotification = async (data) => {
  try {
    const res = await axios.post("api/notification/deletenotification", data);
    return res.data;
  } catch (error) {
    return 500;
  }
}

const deleteNotificationArray = async (data) => {
  try {
    const res = await axios.post("api/notification/deletenotificationarray", data);
    return res.data;
  } catch (error) {
    return 500;
  }
}

export {
  getNotification,
  putNotification,
  deleteNotification,
  deleteNotificationArray
};
