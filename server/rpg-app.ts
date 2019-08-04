import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import BattleLobby from './models/battle-lobby';
import WhiteMage from './models/characters/white-mage';

export default class RpgApp {
    private app = express();
    private server: any;
    private io: any;
    private battleLobby: BattleLobby = new BattleLobby();

    constructor(
        public readonly port: number
    ) {
        this.server = http.createServer(this.app);

        this._setEnv();
        this._initDataBase();
        this._configureApp();
        this._initSockets();
        this._startServer();
    }

    private _setEnv() {
        if (process.env.NODE_ENV !== 'production') {
            dotenv.config();
        }
    }

    private _initDataBase(): void {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    }

    private _configureApp() {
        this.app.use(express.static(path.join(__dirname, '../dist/rpg')));
        this.app.get('*', (req: any, res: any) => res.sendFile(path.join(__dirname, '../dist/rpg/index.html')));
    }

    private _initSockets() {
        this.io = require('socket.io')(this.server);

        this.io.on('connection', (socket) => {
            console.log('a user connected');

            const character: WhiteMage = new WhiteMage(1, 1, 'test');

            this.battleLobby.characters.push(character);

            socket.emit('battle-lobby', this.battleLobby);

            console.log('there is ' + this.battleLobby.characters.length + ' in the battle lobby');
        });
    }

    private _startServer() {
        this.server.listen(this.port, () => console.log(`RPG listening on port ${this.port}!`));
    }
}
