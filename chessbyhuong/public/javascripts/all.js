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
  $(".container").hide(1000);
  $(".game-room").show(1000);
  $(".chat--username").html(username);
});

// Hiện users online
socket.on("server--usersOnline", function(usernames) {
  $(".challengers").html("");
  usernames.forEach(function(e) {
    if (e != $(".chat--username").text()) {
      $(".challengers").append(`<div class="row needpadding1">
      <div class="col-9 chat--list">
        <p id="chat--list-user">${e}</p>
      </div>
      <div class="col-3">
          <img class="icon-challenge" data-toggle="tooltip" data-placement="right" title="Challenge this player" src="/images/challenge.png" alt="Challenge">
      </div>
    </div>`);
    }
  });
});

// User logout
$(".sign-out-btn").click(function() {
  socket.emit("client--signout");
  $(".container").show(1000);
  $(".game-room").hide(1000);
});

// User send msg
$("#chat--input").keypress(function(e) {
  let key = e.which;
  if (key == 13) {
    socket.emit("client--sendmsg", $("#chat--input").val());
  }
});

// User receive msg
socket.on("server--sendmsg", function(msg) {
  $(".chat--msg-line").append(
    `<p class="chat--msg-user">${msg.user}: <span class="chat--msg-show">${msg.content}</span> </p>`
  );
  $("#chat--input").val("");
});
