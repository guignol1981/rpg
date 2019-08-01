const express = require('express');
const path = require('path');
const http = require('http');


export default class RpgApp {
    private app = express();
    private server: any;
    private io: any;

    constructor(
        public readonly port: number
    ) {
        this.server = http.createServer(this.app);

        this._configureApp();
        this._initSockets();
        this._startServer();
    }

    private _configureApp() {
        this.app.use(express.static(path.join(__dirname, '../dist/rpg')));
        this.app.get('*', (req: any, res: any) => res.sendFile(path.join(__dirname, '../dist/rpg/index.html')));
    }

    private _initSockets() {
        this.io = require('socket.io')(this.server);

        this.io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('event1', (data: any) => {
                console.log(data.msg);
            });

            socket.emit('event2', {
                msg: 'Server to client, do you read me? Over.'
            });
        });
    }

    private _startServer() {
        this.server.listen(this.port, () => console.log(`RPG listening on port ${this.port}!`));
    }
}
