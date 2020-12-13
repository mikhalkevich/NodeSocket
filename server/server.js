var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
var socketioJwt = require('socketio-jwt');
const url = require('url');
require('dotenv').config({path: '../../../.env'});

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3307',
    database: 'world',
    password: ''
})
io.on('connection', socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    timeout: 15000
}));// When authenticated, send back name + email over socket
io.on('authenticated', function (socket) {
    myurl = url.parse(socket.decoded_token.iss);
    path = myurl.pathname.split("/");
    send_id = path.slice(-1)[0];
    console.log(socket.decoded_token, socket.decoded_token.sub, myurl.pathname, send_id);
    socket.emit('id', socket.decoded_token.sub);
    new_id = 0;
    new_id_new = 0;
    arr = [];
    setInterval(function () {
        query = 'SELECT * FROM messages WHERE sender_id = '+ socket.decoded_token.sub +' AND user_id = ' + send_id + ' OR ( user_id = '+ socket.decoded_token.sub +' AND sender_id = ' + send_id + ' ) ORDER BY id DESC LIMIT 1';
        db.query(query, function(err, row){
            new_id = row[0].id;
           // console.log(row);
           // socket.emit('row', row);
            if (new_id_new != new_id) {
                //socket.emit('echo', row[0].ID + ' --- --- \n');
                new_id_new = new_id;
                db.query(query, function (err, rows) {
                    if (err) throw err;
                    socket.emit('row', row);
                });
            }
        });
    }, 2000);
});
server.listen(3003);