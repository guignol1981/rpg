
const express = require('express');
const path = require('path');
const http = require('http');

// var io = require('socket.io')(http);
// io.on('connection', function (socket) {
//     console.log('a user connected');
//     socket.on('event1', (data) => {
//         console.log(data.msg);
//     });

//     socket.emit('event2', {
//         msg: 'Server to client, do you read me? Over.'
//     });
// });

module.exports = class RpgApp {
    private app = express();
    private server: any;
    private io: any;

    constructor(
        public readonly port: number
    ) {
        this.server = http.createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.app.use((req: any, res: any, next: any) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
            if ('OPTIONS' === req.method) {
                res.sendStatus(200);
            } else {
                console.log(`${req.ip} ${req.method} ${req.url}`);
                next();
            }
        });

        this.app.use(express.static(path.join(__dirname, '../dist/rpg')));
        this.app.get('*', (req: any, res: any) => res.sendFile(path.join(__dirname, '../dist/rpg/index.html')));

        this.io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('event1', (data) => {
                console.log(data.msg);
            });

            socket.emit('event2', {
                msg: 'Server to client, do you read me? Over.'
            });
        });

        this.server.listen(this.port, () => console.log(`RPG listening on port ${this.port}!`));
    }
};
