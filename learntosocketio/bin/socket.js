const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log(socket.id + " is connected.");
  socket.on("disconnect", function() {
    console.log(socket.id + " is disconnected.");
  });
  socket.on("Client-send-data", function(msg){
      console.log(msg);
      // Case 1: Server sends to all windows
    //   io.sockets.emit("Server-send-data", "server sending to other ones: " + msg)
      
    // Case 2: Server sends to A only
    // socket.emit("Server-send-data", "server sending to A only: " + msg)
    
    // Case 3: A clicks, server sends to B, C // B clicks, server sends to A,C
    socket.broadcast.emit("Server-send-data", "server not send to A: " + msg)

  })
});

http.listen(5000, function() {
  console.log("listening on *:5000");
});
