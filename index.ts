const { Server } = require("socket.io");

const io = new Server({cors: "http://localhost:5173"});

let onlineUser:any=[]
io.on("connection", (socket:any) => {
  console.log("new Connection", socket.id);

  //listen to connection
  socket.on("addNewUser", (userId:any)=>{
    console.log("userId", userId)
    !onlineUser.some((user:any)=>user.userId === userId)&&
    onlineUser.push({
      userId:userId,
      socketId: socket.id,
    });
    console.log("onlineUsers", onlineUser)
    io.emit("getOnlineUsers", onlineUser)
  });
  //add Message
  socket.on("sendMessage", (message:any)=>{
    const user = onlineUser.find((user:any)=>user.userId===message.reciepientId)
    if(user){
      io.to(user.socketId).emit("getMessage", message)
    }
  })
  socket.on("disconnect", ()=>{
    onlineUser= onlineUser.filter((user:any)=>user?.socketId!== socket.id);
    io.emit("getOnlineUsers", onlineUser)
  })
});

io.listen(3000);