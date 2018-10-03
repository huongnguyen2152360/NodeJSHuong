const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log(socket.id + " is connected.");
});

http.listen(5000, function() {
  console.log("I'm listening on port 5000");
});
