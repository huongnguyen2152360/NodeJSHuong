var socket = io.connect("http://localhost:5000/");
// import Chess from './chess'
$(".game-room").hide();


// Client đăng ký username
$("#register-input").keypress(function (e) {
  let key = e.which;
  if (key == 13) {// the enter key code
    // get socket id
    socket.on("connection", function () {
      return socket.id
    })
    $("#register-btn").click();
    socket.emit("client--regisUsername", $("#register-input").val(), socket.id);
  }
});

// Nhận kết quả đăng ký username
// Đăng ký failed
socket.on("server--regisFail", function () {
  $(".regis-notice").html(`<h5>User existed or Please enter your username to start.</h5>`);
});
// Đăng ký success
socket.on("server--regisSuccess", function (username, socketid) {
  $(".container").hide(1000);
  $(".game-room").show(1000);
  $(".chat--username").html(username);
  $(".chat--id").html(socketid);
});

// Hiện users online
socket.on("server--usersOnline", function (usernames) {
  $(".challengers").html("");
  usernames.forEach(function (e) {
    if (e.username != $(".chat--username").text()) {
      $(".challengers").append(`<div class="row needpadding1">
      <div class="col-9 chat--list">
        <p id="chat--list-user">${e.username}</p>
      </div>
      <div class="col-3 challengers--row">
          <img class="icon-challenge" data-toggle="{tooltip,modal}" data-placement="right" title="Challenge this player" src="/images/challenge.png" alt="Challenge" data-target="#basicExampleModal">
          <div class="id-challenge" style="display:none;">${e.id}</div>
      </div>
    </div>`);
    }
  });
});

// User logout
$(".sign-out-btn").click(function () {
  socket.emit("client--signout");
  $(".container").show(1000);
  $(".game-room").hide(1000);
});

// User send msg
$("#chat--input").keypress(function (e) {
  let key = e.which;
  if (key == 13) {
    socket.emit("client--sendmsg", $("#chat--input").val());
  }
});

// User receive msg
socket.on("server--sendmsg", function (msg) {
  $(".chat--msg-line").append(
    `<p class="chat--msg-user">${msg.user}: <span class="chat--msg-show">${msg.content}</span></p> `
  );
  $("#chat--input").val("");
});

// UserA click to challenge userB
$(document).on("click", ".icon-challenge", function (socketidB, socketidA, usera) {
  //socketid of users
  socketidB = $(this).parent().find('.id-challenge').html()
  socketidA = $('.chat--id').html()
  //username of userA
  usera = $('.chat--username').html()
  socket.emit('usera--challenge', usera, socketidB, socketidA);
})

//UserB receive challenge
socket.on('server--receivechallenge', function (usera, socketidA) {
  $('#basicExampleModal').modal('show')
  $('.modal-body1').html(`${usera} wants to challenge you!`)
  $('.modal-body2').html(socketidA)
})

//User B accept challenge
$('.challenge--accept-btn').click(function () {
  let socketidA = $('.modal-body2').html()
  let socketidB = $('.chat--id').html()
  socket.emit('createroom', socketidA, socketidB)
})

// Receive rooms info 
socket.on('rooms', function (rooms) {
  for (let i = 0; i < rooms[0].players.length; i++) {
    if (i % 2 == 0) {
      color = "white"
    } else {
      color = "black"
    }
  }
  socket.emit('game--start', rooms, color)
})

socket.on('game--start', function (rooms, color) {

  let game = new Chess(),
    statusEl = $('#status'),
    fenEl = $('#fen'),
    pgnEl = $('#pgn');
  console.log(color);
  // let color
  //  console.log(rooms);
  //  if (rooms[0].players[0])
  // rooms.forEach(room => {
  //   for (let i = 0; i < room.players.length; i++) {
  //     if (i % 2 == 0) {
  //       color = "white"
  //       socket.emit()
  //     } else {
  //       return color = "black"
  //     }
  //   }
  // })

  // ONLY ALLOW LEGAL MOVES

  // do not pick up pieces if the game is over
  // only pick up pieces for the side to move
  var onDragStart = function (source, piece, position, orientation) {
    if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
      (game.turn() === 'w' && color === 'black') ||
      (game.turn() === 'b' && color === 'white')) {
      return false;
    }
  };
  const cfg = {
    // orientation: color,
    pieceTheme: 'images/chesspieces/wikipedia/{piece}.png',
    position: 'start',
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
  };

  let board = ChessBoard('board', cfg);

})