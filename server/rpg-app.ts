import flash from 'connect-flash';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import WhiteMage from './models/characters/white-mage';
import Game from './models/game';
import characterRouter from './routers/character-router';
import userRouter from './routers/user-router';
import UserModel from './schemas/user';
import bodyParser = require('body-parser');
import express = require('express');
import expressSession = require('express-session');

const MongoStore = require('connect-mongo')(expressSession);
const sessionMiddleware = expressSession({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
});

export default class RpgApp {
    private app = express();
    private server: any;
    private socket: SocketIO.Socket;
    private game: Game = new Game();

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
        this.app.use(sessionMiddleware);
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private _initRouter(): void {
        this.app.use('/api/users', userRouter);
        this.app.use('/api/characters', characterRouter);
        this.app.get('*', (req: express.Request, res: express.Response) => res.sendFile(path.join(__dirname, '../dist/rpg/index.html')));
    }

    private _initSockets(): void {
        this.socket = require('socket.io')(this.server);

        this.socket.use((socket: any, next) => {
            sessionMiddleware(socket.request, {}, next);
        });

        this.socket.use((socket: any, next) => {
            UserModel.findById(socket.request.session.passport.user)
                .populate('character')
                .exec((err, user) => {
                    if (err) { throw err; }

                    socket.request.user = user;

                    next();
                });
        });

        this.socket.on('connection', (socket) => {
            console.log('a user connected');
            const user = socket.request.user;
            const character: WhiteMage = new WhiteMage(user.character.id, user.character.level, user.character.name);

            this.game.world[0].visitors.push(character);

            console.log(this.game.world[0].visitors[0]);

            this.socket.emit('game', this.game);
        });
    }

    private _startServer(): void {
        this.server.listen(this.port, () => console.log(`RPG listening on port ${this.port}!`));
    }
}
