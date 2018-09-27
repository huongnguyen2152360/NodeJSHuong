// Make connection
var socket = io.connect("http://localhost:5000");

// Client send button
$("#userA").click(function() {
  console.log("userA");
  socket.emit("Client-send-data", "This is a message to you.");
});

// Client receive what server sends
socket.on("Server-send-data", function(msg) {
  $("#server-return-msg").append(
    "What client receives from server-return: " + msg
  );
});
