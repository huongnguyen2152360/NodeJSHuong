const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const manageUsers = [];

io.on("connection", function(socket) {
  console.log(socket.id + " is connected.");
  socket.on("client--regisUsername", function(data) {
    if (manageUsers.indexOf(data) >= 0) {
      socket.emit("server--regisFail");
    } else {
      manageUsers.push(data);
      socket.Username = data;
      socket.emit("server--regisSuccess", data);
      // let findData = manageUsers.indexOf(data);
      // manageUsers.splice(findData,1);
      // console.log(manageUsers);
      io.sockets.emit("server--usersOnline", manageUsers);
    }
  });

  // Client logout
  socket.on("client--logout", () => {
    manageUsers.splice(manageUsers.indexOf(socket.Username), 1);
    socket.broadcast.emit("server--usersOnline", manageUsers);
  });

  //Send msg
  socket.on("client--msg", function(msg) {
    io.sockets.emit("server--msg", {user: socket.Username, content: msg} );
  });

  //Client create chat room
  socket.on("client--createroom", function(data) {
    // console.log(socket.adapter.rooms);
    socket.join(data);
    socket.thisroom = data;
    let listRooms = [];
    for (let room in socket.adapter.rooms) {
      listRooms.push(room);
    }
    // Display all rooms to all server
    io.sockets.emit("server--allRooms",listRooms)
    
    // Display current room to current user(s)
    socket.emit("server--currentRoom", data);
  });

  // Client chat trong room
  socket.on("client--chatMsg", function(msg) {
    io.sockets.in(socket.thisroom).emit("server--chatMsg", msg)
  })
});

http.listen(process.env.PORT, function() {
  console.log("I am listening on heroku port");
});
