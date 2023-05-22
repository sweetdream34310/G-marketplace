const Role = require("../../models/Role");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const getRole = async (req, res) => {
  try {
    const rolename = req.body.rolename;
    const role = await Role.findOne({ rolename: rolename });
    if (!role)
      return res.status(400).json({
        message: "No exist",
      });
    else {
      res.status(201).json({
        message: "Success",
        data: role,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    res.status(201).json({
      message: "Success",
      data: roles,
    });
  } catch (error) {
    res.json(error);
  }
};

const getAllRolenames = async (req, res) => {
  let data = [];
  try {
    const roles = await Role.find();

    roles.map((item) => {
      data.push(item.rolename);
    });
    res.status(201).json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    res.json(error);
  }
};
const createRole = async (req, res) => {
  const { rolename, permissions } = req.body;

  console.log(rolename, permissions);

  try {
    const role = await Role.findOne({ rolename: rolename });
    if (role) {
      return res.json(`A role already exist with ${rolename}`);
    }

    const newRole = new Role({
      rolename: rolename,
      permissions: permissions,
    });

    console.log(newRole);

    await newRole.save();

    res.json("success");
  } catch (error) {
    res.json(error);
  }
};

const deleteRole = async (req, res) => {
  const { rolename } = req.body;
  try {
    const role = await Role.findOne({ rolename: rolename });
    if (!role) {
      return res.json(`A role dosen't exist with ${rolename}`);
    }

    await role.delete();

    res.json("success");
  } catch (error) {
    res.json(error);
  }
};

const updateRole = async (req, res) => {
  try {
    const { oldRoleName, newRoleName, permissions } = req.body;

    const role = await Role.findOne({ rolename: oldRoleName });

    if (!role) {
      return res.status(400).json({
        message: "No Role",
      });
    }

    role.rolename = newRoleName;
    role.permissions = permissions;

    await role.save();

    const users = await User.find({role: oldRoleName})

    users.map( async (item) => {
      item.role = newRoleName;
      await item.save();
    })

    res.json("success");
    
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  getAllRolenames,
  getRole,
  updateRole,
  createRole,
  deleteRole,
  getAllRoles,
};
