import axios from 'axios'

const getAllRolenames = async () => {
  try {
    const res = await axios.post("api/role/getallrolenames");
    return res.data.data;
  } catch (error) {
    return 500;
  }
}

const getAllRoles = async () => {
  try {
    const res = await axios.post("api/role/getallroles");
    return res.data.data;
  } catch (error) {
    return 500;
  }
};

const getRole = async (rolename) => {
  const data = { rolename: rolename}
  try {
    const res = await axios.post("api/role/getrole", data);
    return res.data.data;
  } catch (error) {
    return 500;
  }

}

const createRole = async (data) => {
  try {
    const res = await axios.post("api/role/createrole", data);
    return res;
  } catch (error) {
    return 500;
  }
}

const deleteRolewithName = async (data) => {
  try {
    const res = await axios.post("api/role/deleterole", data);
    return res;
  } catch (error) {
    return 500;
  }
}

const updaterole = async (data) => {
  try {
    const res = await axios.post("api/role/updaterole", data);
    return res.data;
  } catch (error) {
    return 500;
  }
};


export {
  getRole,
  getAllRolenames,
  getAllRoles,
  createRole,
  deleteRolewithName,
  updaterole,
};
