import flash from 'connect-flash';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { Socket } from 'socket.io';
import BattleLobby from './models/battle-lobby';
import WhiteMage from './models/characters/white-mage';
import characterRouter from './routers/character-router';
import userRouter from './routers/user-router';
import bodyParser = require('body-parser');
import express = require('express');
import expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

export default class RpgApp {
    private app = express();
    private server: any;
    private socket: SocketIO.Socket;
    private battleLobby: BattleLobby = new BattleLobby();

    constructor(
        public readonly port: number
    ) {
        this.server = http.createServer(this.app);

        this._setEnv();
        this._initDataBase();
        this._initMiddleWares();
        this._initRouter();
        this._initSockets();
        this._startServer();
    }

    private _setEnv(): void {
        if (process.env.NODE_ENV !== 'production') {
            dotenv.config();
        }
    }

    private _initDataBase(): void {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    }

    private _initMiddleWares(): void {
        this.app.use(flash());
        this.app.use(express.static(path.join(__dirname, '../dist/rpg')));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(expressSession({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private _initRouter(): void {
        this.app.use('/api/users', userRouter);
        this.app.use('/api/characters', characterRouter);
        this.app.get('*', (req: any, res: any) => res.sendFile(path.join(__dirname, '../dist/rpg/index.html')));
    }

    private _initSockets(): void {
        this.socket = require('socket.io')(this.server);

        this.socket.on('connection', (socket: Socket) => {
            console.log('a user connected');

            const character: WhiteMage = new WhiteMage(1, 1, 'test');

            this.battleLobby.characters.push(character);

            this.socket.emit('battle-lobby', this.battleLobby);

            console.log('there is ' + this.battleLobby.characters.length + ' in the battle lobby');
        });
    }

    private _startServer(): void {
        this.server.listen(this.port, () => console.log(`RPG listening on port ${this.port}!`));
    }
}
