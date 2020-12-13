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
}));

io.on('authenticated', function (socket) {
    let user = socket.decoded_token.sub;
    let myurl = url.parse(socket.decoded_token.iss);
    path = myurl.pathname.split("/");
    send_id = path.slice(-1)[0];
    console.log(socket.decoded_token, socket.decoded_token.sub, myurl.pathname, send_id);
    new_id = 0;
    new_id_new = 0;
    arr = [];
    //socket.emit('id', socket.decoded_token.sub);
    query = 'SELECT * FROM messages WHERE sender_id = ' + socket.decoded_token.sub + ' AND user_id = ' + send_id + ' OR  user_id = ' + socket.decoded_token.sub + ' AND sender_id = ' + send_id + '  ORDER BY id DESC LIMIT 1';
    db.query(query, function (err, row) {
        if (row[0]) {
            socket.emit('row' + send_id, row);
            //console.log(row);
            new_id = row[0].id;
            setInterval(function () {
                console.log(new_id, new_id_new);
                new_id_new = new_id;
                db.query(query, function (err, row2) {
                    new_id = row2[0].id;
                    if (new_id_new != new_id) {
                        console.log(row2);
                        socket.emit('row' + send_id, row2);
                    }
                });
            }, 2000);
        }
    });
});

server.listen(3003);