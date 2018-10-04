const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const allUsernames = ["aaa"];

io.on("connection", function(socket) {
  console.log(socket.id + " is connected.");
  // Nhận đăng ký username
  socket.on("client--regisUsername", function(username) {
    // Đăng ký fail
    if (allUsernames.indexOf(username) >= 0) {
      socket.emit("server--regisFail");
    } else {
      allUsernames.push(username);
      socket.emit("server--regisSuccess", username);
      io.sockets.emit("server--usersOnline", allUsernames);
    }
  });
});

http.listen(5000, function() {
  console.log("I'm listening on port 5000");
});
