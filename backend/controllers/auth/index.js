const User = require("../../models/User");
const bcrypt = require('bcrypt')
const { signToken } = require('../../middleware/authMiddleware')

const register = async (req, res) => {
  const { username, password, email, role } = req.body
  if (username == undefined || password == undefined || email == undefined) {
    res.status(400).json({
      error: 'request body',
      message: 'insufficient params'
    })
  }
  else {
    try {
      const user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({
          error: email,
          message: `An account already exist with ${email}`
        })
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // Create account
      const newUser = new User({ username: username, password: hashedPassword, email: email, role: role });
      await newUser.save();

      //Remove password from resposne
      newUser.password = undefined;
      delete newUser.password;

      // Generate access token
      const token = signToken({ email: email, username: username, password: password, role: role })

      res.status(201).json({
        message: 'Successfully registered',
        data: newUser,
        token
      })
    }
    catch (error) {
      return res.status(500).json(error);
    }
  }
}

const login = async (req, res) => {
  const { username, password, email, role } = req.body

  if (username == undefined || password == undefined) {
    response.status(400).json({
      error: 'request body',
      message: `insufficient params`,
    })
  }
  else {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Unregistered User"
        })
      }

      const passOk = await bcrypt.compare(password, user.password);
      if (!passOk) {
        return response.status(400).json({
          message: "Password doesn't match",
        });
      }

       // Remove password from response data
       user.password = undefined;
       delete user.password;

       // Generate access token
       const token = signToken({ username: username, email: email, username: username, role: role });

       response.status(200).json({
           message: "Succesfully logged-in",
           data: user,
           token,
       });
    } catch (error) {
      console.error(error);
      response.status(500).send(error);
    }
  }
}

const changeAccount = async (req, res) => {
  try {
    const { name, wallet } = req.auth;
    const checkName = await User.findOne({ name: req.body.newName })
    if (checkName)
      res.status(400).json('The name is already chosen. Please choose another name.');
    else {
      const user = await User.findOne({ name: name });
      user.name = req.body.newName;
      await user.save();
      res.json('success');
    }
  }
  catch (error) {
    res.json(error);
  }
}

const changePassword = async (req, res) => {
  try {
    const { email } = req.auth;
    const user = await User.findOne({ email: email });
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    user.password = hashedPassword;
    await user.save();
    res.json('success');
  }
  catch (error) {
    res.json(error);
  }
}

module.exports = {
  changeAccount,
  register,
  login,
  changePassword
}