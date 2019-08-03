import BattleLobby from './models/battle-lobby';
import WhiteMage from './models/characters/white-mage';

const express = require('express');
const path = require('path');
const http = require('http');


export default class RpgApp {
    private app = express();
    private server: any;
    private io: any;
    private battleLobby: BattleLobby = new BattleLobby();

    constructor(
        public readonly port: number
    ) {
        this.server = http.createServer(this.app);

        this._configureApp();

        this.app.get('*', (req: any, res: any) => res.sendFile(path.join(__dirname, '../dist/rpg/index.html')));

        this._initSockets();
        this._startServer();
    }

    private _configureApp() {
        this.app.use(express.static(path.join(__dirname, '../dist/rpg')));
    }

    private _initSockets() {
        this.io = require('socket.io')(this.server);

        this.io.on('connection', (socket) => {
            console.log('a user connected');

            this.battleLobby.characters.push(new WhiteMage(1, 1, 'test'));

            console.log('there is ' + this.battleLobby.characters.length + ' in the battle lobby');

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
