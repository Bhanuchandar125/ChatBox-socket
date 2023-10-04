const { Server } = require("socket.io");

const io = new Server({cors: "http://localhost:5174"});

let onlineUser=[]
io.on("connection", (socket) => {
  console.log("new Connection", socket.id);

  //listen to connection
  socket.on("addNewUser", (userId)=>{
    console.log("userId", userId)
    !onlineUser.some((user)=>user.userId === userId)&&
    onlineUser.push({
      userId:userId,
      socketId: socket.id,
    });
    console.log("onlineUsers", onlineUser)
    io.emit("getOnlineUsers", onlineUser)
  });
  
});

io.listen(3000);