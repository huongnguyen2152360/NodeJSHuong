const app = require("../app");
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
    console.log("a user connected id= " + socket.id);
    
});

http.listen(5000, function() {
    console.log("listening on *:5000");
});