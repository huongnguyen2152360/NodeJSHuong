// Make connection
//   socket.on('news', function (data) {
    //     console.log(data);
    //     socket.emit('my other event', { my: 'data' })
    
    $(()=>{
        var socket = io.connect('http://localhost:5000');
        console.log("hllo");

})