const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const allUsernames = [];
const turnColor = ["white", "black"]
// const roomID = Math.random().toString(36).substring(2, 13)
const rooms = []

io.on("connection", function (socket) {
  // console.log(socket.id + " is connecteddddddd.");
  // Nhận đăng ký username
  socket.on("client--regisUsername", function (username, socketid) {
    if (allUsernames != '') {
      // Đăng ký fail
      allUsernames.forEach(user => {
        if (user.username == username || username == '') {
          socket.emit("server--regisFail");
        } else {
          allUsernames.push({ 'username': username, 'id': socketid });
          socket.username = username;
          socket.id = socketid;
          socket.emit("server--regisSuccess", username, socketid);
          io.sockets.emit("server--usersOnline", allUsernames);
        }
      })
    } else {
      allUsernames.push({ 'username': username, 'id': socketid });
      socket.username = username;
      socket.id = socketid;
      socket.emit("server--regisSuccess", username, socketid);
      io.sockets.emit("server--usersOnline", allUsernames);
    }
  });

  //Client logout
  socket.on("client--signout", function () {
    allUsernames.splice(allUsernames.indexOf(socket.username), 1);
    socket.broadcast.emit("server--usersOnline", allUsernames);
  });

  // User send msg
  socket.on("client--sendmsg", function (msg) {
    io.sockets.emit("server--sendmsg", { user: socket.username, content: msg });
  });

  //Server receives challenge, sends to userB
  socket.on("usera--challenge", function (usera, socketidB, socketidA) {
    io.to(`${socketidB}`).emit('server--receivechallenge', usera, socketidA)
  })

  // Create a room for userA and userB
  socket.on('createroom', function (socketidA, socketidB) {
    socket.join(socketidA)
    rooms.push({ 'roomID': socketidA, players: [socketidA, socketidB] })
    // socket.emit('rooms',rooms)
    // for (let i = 0; i < rooms[0].players.length; i++) {
    //   if (i % 2 == 0) {
    //     color = "white"
    //   } else {
    //     color = "black"
    //   }
    // }
    io.sockets.emit('rooms', rooms)
    // io.in(socketidA).emit('game--start', rooms, color)
  })

  socket.on('rooms', function(rooms) {
    console.log(rooms);
  })

  // Set color
  // console.log(rooms);
  // rooms.forEach(room => {
  //   for (let i = 0; i < room.players.length; i++) {
  //     if (i % 2 == 0) {
  //       return color = "black"
  //     } else {
  //       return color = "white"
  //     }
  //   }
  //   io.in(`${room.players[0]}`).emit('color', rooms, color)   
  // })


});



http.listen(5000, function () {
  console.log("I'm listening on port 5000");
});
