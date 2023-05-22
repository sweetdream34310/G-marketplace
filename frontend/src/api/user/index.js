import axios from "axios";
import jwt_decode from "jwt-decode";

const getAllUsers = async () => {
  try {
    const res = await axios.post("api/user/getallusers");
    return res.data.data;
  } catch (error) {
    return 500;
  }
};

const createUser = async (data) => {
  try {
    const res = await axios.post("api/user/createuser", data);
    return res.data;
  } catch (error) {
    return 500;
  }
};

const login = async (data) => {
  try {
    const res = await axios.post("api/user/login", data);
    return res.data;
  } catch (error) {
    return 500;
  }
};

const forgotPassword = async (data) => {
  try {
    const res = await axios.post("api/user/forgotpassword", data);
    return res.data;
  } catch (error) {
    return 500;
  }
};

const updateUsernameRole = async (data) => {
  try {
    const res = await axios.post("api/user/updateusernamerole", data);
    return res.data;
  } catch (error) {
    return 500;
  }
};

const changeAccount = async (data) => {
  try {
    const res = await axios.post("api/user/changeaccount", data);
    return res.data;
  } catch (error) {
    return 500;
  }
};

const deleteUser = async (data) => {
  try {
    const res = await axios.post("api/user/deleteuser", { data });
    return res.data;
  } catch (error) {
    return 500;
  }
};

const getPermissions = async () => {
  const token = jwt_decode(localStorage.getItem("token"));

  const data = {
    email: token.email,
  };

  try {
    const res = await axios.post("api/user/getpermissions", data);
    if (res.data.status) {
      localStorage.setItem("permissions", res.data.permissions);
      return res.data.permissions;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getRole = async (email) => {
  const sendData = { email };
  try {
    const res = await axios.post("api/user/getrole", sendData);
    return res.data.role;
  } catch (error) {
    return false;
  }
};

export {
  getAllUsers,
  login,
  forgotPassword,
  changeAccount,
  updateUsernameRole,
  deleteUser,
  createUser,
  getPermissions,
  getRole,
};
