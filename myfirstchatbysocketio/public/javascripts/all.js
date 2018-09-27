var socket = io.connect("http://localhost:8000");

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
    window.location.href = `/users/chat2`;
    console.log( $('#currentUser').html());
    // $('#currentUser').html(`${data}`);
})