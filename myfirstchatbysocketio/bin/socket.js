const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const manageUsers = ["aaa"];

io.on("connection", function(socket) {
  console.log(socket.id + " is connected.");
  socket.on("client--regisUsername", function(data) {
   if (manageUsers.indexOf(data) >= 0) {
    socket.emit("server--regisFail")
   } else {
     manageUsers.push(data);
     console.log(manageUsers);
    socket.emit("server--regisSuccess", data)
   }
  });
});

http.listen(8000, function() {
  console.log("I am listening on *:8000");
});
