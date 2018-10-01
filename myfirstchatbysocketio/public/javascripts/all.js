var socket = io.connect("http://localhost:8000");
$(".index").show();
$("#chatform").hide();
// Client đăng ký username (Index)
$("#register-chat2").click(function() {
  socket.emit("client--regisUsername", $("#txtUsername").val());
});

//Client nhận kết quả đăng ký username (Index)
socket.on("server--regisFail", function() {
  $(".all-noti").css("visibility", "invisible");
  $(".all-noti").html(`<p>Username existed.</p>`);
});

socket.on("server--regisSuccess", function(data) {
  $(".index").hide(5000);
  $("#chatform").show(3000);
  $("body").css({
    padding: "0",
    margin: "0",
    background:
      "-moz-linear-gradient(-45deg, #183850 0, #183850 25%, #192C46 50%, #22254C 75%, #22254C 100%)",
    background:
      "-webkit-linear-gradient(-45deg, #183850 0, #183850 25%, #192C46 50%, #22254C 75%, #22254C 100%)",
    "background-repeat": "no-repeat",
    "background-attachment": "fixed",
    color: "#efefef"
  });
  $("html").css("background", "unset");
  $("#currentUser").html(`${data}`);
});

socket.on("server--usersOnline", function(data) {
  $("#leftbox-content").html("");
  // console.log(socket.Username);
  data.forEach(function(e) {
    $("#leftbox-content").append(
      "<div class='leftbox-content--usersonline'>" + e + "</div>"
    );
  });
});

// Client logout
$("#btnLogout").click(() => {
  socket.emit("client--logout");
  $("#chatform").hide(2000);
  $(".index").show(3000);
  $("body").css({
    "background-color": "transparent",
    background: "unset"
  });
  $("html").css({
    background: "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)"
  });
});

//Client send msg
$("#btnSendMessage").click(function() {
  console.log("btn send msg");
  socket.emit("client--msg", $("#txtMessage").val());
});

//Client receive msg
socket.on("server--msg", function(msg) {
  $("#listMessages").append(
    (`<div class='msg--content'>${msg.user}: ${msg.content}</div>`)
  );
});
