var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.get('/*', function (req, res) {
    console.log(req.url.match('^[^?]*')[0])
    res.sendfile(__dirname + req.url.match('^[^?]*')[0]);
});


io.on('connection', function (socket) {
    socket.emit('keypress', {
        hello: 'world'
    });
    socket.on('up', function (data) {
        console.log("up");
        socket.broadcast.emit('pageup', {
            dummy: 'dummy'
        });
    });
    socket.on('down', function (data) {
        console.log("down");
        socket.broadcast.emit('pagedown', {
            dummy: 'dummy'
        });
    });
    socket.on('left', function (data) {
        console.log("left");
        socket.broadcast.emit('pageleft', {
            dummy: 'dummy'
        });
    });
    socket.on('right', function (data) {
        console.log("right");
        socket.broadcast.emit('pageright', {
            dummy: 'dummy'
        });
    });
    //socket.on('accel', function (data) {
        //console.log(data);
      //  socket.broadcast.emit('serveracc', data);
//    });
});