const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'dist/rpg')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/rpg/index.html')));

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('event1', (data) => {
        console.log(data.msg);
    });

    socket.emit('event2', {
        msg: 'Server to client, do you read me? Over.'
    });
});

http.listen(port, () => console.log(`RPG listening on port ${port}!`));
