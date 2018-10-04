var socket = io.connect("http://localhost:5000");
$(".game-room").hide();
// Client đăng ký username
$("#register-input").keypress(function(e) {
  let key = e.which;
  if (key == 13) {
    // the enter key code
    $("#register-btn").click();
    socket.emit("client--regisUsername", $("#register-input").val());
  }
});

// Nhận kết quả đăng ký username
// Đăng ký failed
socket.on("server--regisFail", function() {
  $(".regis-notice").html(`<h5>Username existed.</h5>`);
});
// Đăng ký success
socket.on("server--regisSuccess", function(username) {
  $(".container").hide(3000);
  $(".game-room").show(3000);
  $(".chat--username").html(username);
});

// Hiện users online
socket.on("server--usersOnline", function(usernames) {
    
})