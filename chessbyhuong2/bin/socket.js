const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const allUsernames = [];

io.on("connection", function(socket) {
  // console.log(socket.id + " is connecteddddddd.");
  // Nhận đăng ký username
  socket.on("client--regisUsername", function(username,socketid) {
    // Đăng ký fail
    if (allUsernames.indexOf(username) >= 0 | username == '') {
      socket.emit("server--regisFail");
    } else {
      allUsernames.push({'username': username, 'id': socketid});
      socket.username = username;
      socket.id = socketid;
      socket.emit("server--regisSuccess", username);
      io.sockets.emit("server--usersOnline", allUsernames);
    }
  });

  //Client logout
  socket.on("client--signout", function() {
    allUsernames.splice(allUsernames.indexOf(socket.username), 1);
    socket.broadcast.emit("server--usersOnline", allUsernames);
  });

  // User send msg
  socket.on("client--sendmsg", function(msg) {
    io.sockets.emit("server--sendmsg", { user: socket.username, content: msg });
  });

  //Server receives challenge, sends to userB
  socket.on("usera--challenge",function(usera,socketid) {
    // socket.emit("server--receivechallenge", usera,socketid)
    io.to(`${socketid}`).emit('server--receivechallenge', usera)
  })
});

http.listen(5000, function() {
  console.log("I'm listening on port 5000");
});
