let c_users = [];

function join_User(id, username, room) {
  try {
    const p_userNew = { id, username, room };
    let isRoom =
      c_users.findIndex((p_user) => p_user.room === room) == -1 ? false : true;
    let isUser =
      c_users.findIndex((p_user) => p_user.username === username) == -1
        ? false
        : true;
    isRoom
      ? isUser
        ? (c_users[
          c_users.findIndex((p_user) => p_user.username === username)
        ].id = id)
        : c_users.push(p_userNew)
      : c_users.push(p_userNew);
    return c_users.find((p_user) => p_user.username === p_userNew.username);
  } catch (error) {
    return []
  }
}

function get_Current_User(username, room) {
  try {
    console.log(username)
    return c_users.find((p_user) => p_user.username == username && p_user.room == room )
  } catch (error) {
    return []
  }
}

function broadcastToRoomUsers(room) {
  try {
    const room_users = c_users.filter((user) => user.room == room);
    return room_users;
  } catch (error) {
    return [] 
  }
}

module.exports = {
  join_User,
  get_Current_User,
  broadcastToRoomUsers
}