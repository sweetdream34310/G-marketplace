const Task = require("../../models/Task");
const bcrypt = require('bcrypt')

// const getRole = async (req, res) => {
//   try {
//     const rolename = req.body.rolename;
//     console.log(rolename)
//     const role = await Role.findOne({ rolename: rolename })
//     if (!role)
//       return res.status(400).json({
//         message: "No exist"
//       })
//     else {
//       res.status(201).json({
//         message: 'Success',
//         data: role
//       });
//     }
//   }
//   catch (error) {
//     res.json(error);
//   }
// }

// const getAllRoles = async (req, res) => {
//   try {
//     const roles = await Role.find()

//     res.status(201).json({
//       message: "Success",
//       data: roles
//     })
//   }
//   catch (error) {
//     res.json(error);
//   }
// }

// const getAllRolenames = async (req, res) => {
//   let data = [];
//   try {
//     const roles = await Role.find()

//     roles.map((item) => {
//       data.push(item.rolename);
//     })
//     res.status(201).json({
//       message: "Success",
//       data: data
//     })
//   }
//   catch (error) {
//     res.json(error);
//   }
// }
// const createRole = async (req, res) => {
//   const { rolename, permissions } = req.body;

//   try {
//     const role = await Role.findOne({ rolename: rolename });
//     if (role) {
//       return res.json(
//         `A role already exist with ${rolename}`
//       )
//     }

//     const newRole = new Role({
//       rolename: rolename,
//       permissions: permissions,
//     })

//     await newRole.save();

//     res.json('success');
//   } catch (error) {
//     res.json(error);
//   }
// }

// const deleteRole = async (req, res) => {
//   const { rolename } = req.body;
//   console.log(req.body)
//   try {
//     const role = await Role.findOne({ rolename: rolename });
//     if (!role) {
//       return res.json(
//         `A role dosen't exist with ${rolename}`
//       )
//     }

//     await role.delete();

//     res.json('success');
//   } catch (error) {
//     res.json(error);
//   }
// }

// const updateRole = async (req, res) => {
//   try {
//     const { oldRoleName, newRoleName, permissions } = req.body;
//     console.log(req.body)

//     const role = await Role.findOne({ rolename: oldRoleName });

//     if (!role) {
//       return res.status(400).json({
//         message: "No Role"
//       })
//     }
//     if (oldRoleName == newRoleName) {
//       if (permissions == role.permissions) {
//         return res.status(400).json('There is no change')
//       } else {
//         role.permissions = permissions;
//         await role.save();
//         res.json('success');
//       }
//     } else {
//       const newRole = await Role.findOne({ rolename: newRoleName });
//       if (newRole) {
//         return res.status(400).json(`A role is exist with ${newRoleName}`)
//       } else { 
//         role.rolename = newRoleName;
//         role.permissions = permissions;
//         console.log(newRoleName)
//         console.log(permissions)

//         await role.save();

//         res.json('success');
//       }
//     }
//   }
//   catch (error) {
//     res.json(error);
//   }
// }


const getAll = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(201).json({
      message: "Success",
      data: tasks
    })
  } catch (error) {

  }
}

const updateTask = async (req, res) => {
  const { oldContent, newContent } = req.body
  try {
    const task = await Task.findOne({ taskContent: oldContent })

    if (!task) {
      return res.json(`There is no task with ${oldContent}`)
    } else {
      task.taskContent = newContent;
      task.save();
      res.json('success');
    }
  } catch (error) {
    res.json(error)
  }
}

const createTask = async (req, res) => {
  const { taskContent } = req.body;
  try {
    const task = await Task.findOne({ taskContent: taskContent })

    if (task) {
      return res.json(
        'This task already exist.'
      )
    }

    const newTask = new Task({
      taskContent: taskContent,
      status: 'new'
    })

    await newTask.save();

    res.json('success');

  } catch (error) {
    res.json(error)
  }
}

const deleteTask = async (req, res) => {
  const { content } = req.body;
  try {
    const task = await Task.findOne({ taskContent: content })

    if (!task) {
      return res.json(`There is no task with ${content}`)
    }

    await task.delete();

    res.json('success');

  } catch (error) {
    res.json(error)
  }
}

module.exports = {
  getAll,
  createTask,
  updateTask,
  deleteTask
}