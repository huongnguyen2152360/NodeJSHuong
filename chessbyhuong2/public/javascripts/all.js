var socket = io.connect("http://localhost:5000/");
$(".game-room").hide();

// Client đăng ký username
$("#register-input").keypress(function(e) {
  let key = e.which;
  if (key == 13) {// the enter key code
    // get socket id
    socket.on("connection", function() {
      return socket.id
    })
    $("#register-btn").click();
    socket.emit("client--regisUsername", $("#register-input").val(),socket.id);
  }
});

// Nhận kết quả đăng ký username
// Đăng ký failed
socket.on("server--regisFail", function() {
  $(".regis-notice").html(`<h5>User existed or Please enter your username to start.</h5>`);
});
// Đăng ký success
socket.on("server--regisSuccess", function(username) {
  $( ".container" ).hide(1000) ;
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
      <div class="col-3 chess-challenge">
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
    `<p class="chat--msg-user">${msg.user}: <span class="chat--msg-show">${msg.content}</span></p> `
  );
  $("#chat--input").val("");
});

// User click challenge
// $('.icon-challenge').click(function() {
//   console.log($(this));
//   // console.log(socket.id);
// })

// $('.clicktest').click(() => {
//   console.log('click test');
// })
$(document).on("click",".icon-challenge", function(username) {
  // io.to(socket.id).emit('hey', 'I just met you');
  $('#chat--list-user').html() = username
  console.log($('#chat--list-user').html());
  console.log(username);

})

