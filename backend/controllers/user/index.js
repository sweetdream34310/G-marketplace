const User = require("../../models/User");
const Role = require("../../models/Role");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signToken } = require("../../middleware/authMiddleware");
const { sendNewPassword } = require("../email");

const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        message: "Unregistered User",
      });
    else {
      res.status(201).json("success");
    }
  } catch (error) {
    res.json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(201).json({
      message: "Success",
      data: users,
    });
  } catch (error) {
    res.json(error);
  }
};

const updateUsernameRole = async (req, res) => {
  try {
    const { email, username, role } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Unregistered User",
      });
    }
    user.username = username;
    user.role = role;

    await user.save();
    res.json("success");
  } catch (error) {
    res.json(error);
  }
};

const changeAccount = async (req, res) => {
  try {
    const { email, username, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        message: "Unregisterd User",
      });
    }

    const passOk = await bcrypt.compare(oldPassword, user.password);

    if (!passOk) {
      return res.json({
        message: "Password doesn't match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.username = username;
    user.password = hashedPassword;

    await user.save();

    const token = signToken({
      username: username,
      email: email,
      username: username,
      role: user.role,
      password: newPassword,
    });

    res.json({
      message: "success",
      token,
    });
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, username, role, password } = req.body;

    if (username == undefined || password == undefined || email == undefined) {
      res.status(400).json({
        error: "request body",
        message: "insufficient params",
      });
    } else {
      try {
        const user = await User.findOne({ email: email });

        if (user) {
          return res.json(`A user exist with ${email}`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const length = (await User.find()).length;
        //create account
        const newUser = new User({
          email: email,
          username: username + `@${length}`,
          role: role,
          password: hashedPassword,
        });

        await newUser.save();
        //Remove password from resposne
        // newUser.password = undefined;
        // delete newUser.password;
        res.json("success");
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  } catch (error) {
    res.json(error);
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  if (email == undefined || password == undefined) {
    res.status(400).json({
      error: "request body",
      message: `insufficient params`,
    });
  } else {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.json({
          message: "Unregistered User",
        });
      }

      const passOk = await bcrypt.compare(password, user.password);
      if (!passOk) {
        return res.json({
          message: "Password doesn't match",
        });
      }

      // Remove password from response data
      user.password = undefined;
      delete user.password;

      const username = user.username;
      const rolename = user.role;

      const role = await Role.findOne({ rolename: rolename });

      const permissions = role.permissions;

      // Generate access token
      const token = signToken({
        username: username,
        email: email,
        username: username,
        role: rolename,
        password: password,
      });

      res.json({
        message: "Succesfully logged-in",
        token,
        permissions,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ message: "Unregistered User" });
    }

    const newPassword = await sendNewPassword(email);

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;

      await user.save();

      return res.json({ message: "success" });
    }
  } catch (error) {
    return res.json({ message: "error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.body.data;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Unregistered User",
      });
    }
    await user.delete();
    res.json("success");
  } catch (error) {
    res.json(error);
  }
};

const createMockUser = async () => {
  try {
    let email = "owen.m@rglobal.co.uk";
    let username = "Owen Min";
    let role = "admin";
    let password = "123qwe!@#QWE";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (username == undefined || password == undefined || email == undefined) {
      console.log("set the available account info.");
    } else {
      try {
        const user = await User.findOne({ email: email });

        if (user) {
          user.password = hashedPassword;
          user.role = role;
          await user.save();
          return console.log("success update password");
        }

        //create account
        const newUser = new User({
          email: email,
          username: username,
          role: role,
          password: hashedPassword,
        });

        await newUser.save();
        //Remove password from resposne
        // newUser.password = undefined;
        // delete newUser.password;
        console.log("success");
      } catch (error) {
        return console.log("error");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getPermissions = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const rolename = user.role;

    const role = await Role.findOne({ rolename });
    const permissions = role.permissions;

    return res.json({
      status: true,
      permissions,
    });
  } catch (error) {
    return res.json({
      status: false,
      permissions: [],
    });
  }
};

const getRole = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const role = user.role;
    return res.json({ role });
  } catch (error) {
    return res.json({ role: false });
  }
};

createMockUser();

module.exports = {
  createUser,
  login,
  forgotPassword,
  changeAccount,
  getUser,
  updateUsernameRole,
  getAllUsers,
  deleteUser,
  getPermissions,
  getRole,
};
