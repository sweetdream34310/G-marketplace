const { join_User, get_Current_User, broadcastToRoomUsers } = require('./socketManage')

const socketServer = async (https) => {
  const server = require("socket.io")(https,
    {
      cors: {
        origin: "*",
        methods: "*"
      }
    }
  );

  //initializing the socket io connection
  server.on("connection", (socket) => {
    console.log("socket connected");
    //for a new user joining the room
    socket.on("joinRoom", ({ email, room }) => {
      console.log('join');
      //* create user
      try {
        const p_user = join_User(socket.id, email, room);
        socket.join(p_user.room);
      } catch (error) {
        console.log(error);
      }
    });

    //user sending message
    socket.on("notification", ({email, room}) => {
      //gets the room user and the message sent
      try {
        const p_user = get_Current_User(email, room);
        let allUsers;
        if (p_user) allUsers = broadcastToRoomUsers(p_user.room);

        socket.to(allUsers[0].room).emit("notification");
      } catch (error) {
        console.log(error);
      }
    });
  });
}

module.exports = socketServer

