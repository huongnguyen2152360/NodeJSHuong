const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const allUsernames = [];

io.on("connection", function(socket) {
  console.log(socket.id + " is connecteddddddd.");
  // Nhận đăng ký username
  socket.on("client--regisUsername", function(username) {
    console.log('socket: client--regisUsername');
    // Đăng ký fail
    if (allUsernames.indexOf(username) >= 0) {
      socket.emit("server--regisFail");
      console.log('socket: server--regisFail');
    } else {
      console.log('socket: server-regis success');
      allUsernames.push(username);
      socket.username = username;
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
});

http.listen(5000, function() {
  console.log("I'm listening on port 5000");
});
