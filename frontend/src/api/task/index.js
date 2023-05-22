import axios from "axios";

const getAllTask = async () => {
  try {
    const res = await axios.post("api/task/getall");
    return res.data
  } catch (error) {
    return 500;
  }
}

const updateTask = async (oldContent, newContent) => {
  const data = {
    oldContent : oldContent,
    newContent : newContent
  }
  try {
    const res = await axios.post("api/task/updatetask", data);
    return res.data
  } catch (error) {
    return 500;
  }
}

const deleteTask = async (content) => {
  const data = { content : content}
  try {
    const res = await axios.post("api/task/delete", data);
    return res.data
  } catch (error) {
    return 500
  }
}

const createTask = async (content) => {
  const data = { taskContent: content }
  try {
    const res = await axios.post("api/task/createtask", data);
    return res.data;
  } catch (error) {
    return 500;
  }
}

export {
  createTask,
  updateTask,
  getAllTask,
  deleteTask
}