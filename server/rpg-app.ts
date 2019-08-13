import flash from 'connect-flash';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import Game from './models/game';
import characterRouter from './routers/character-router';
import userRouter from './routers/user-router';
import UserModel from './schemas/user';
import bodyParser = require('body-parser');
import express = require('express');
import expressSession = require('express-session');

const MongoStore = require('connect-mongo')(expressSession);
const sessionMiddleWare = expressSession({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
});

export default class RpgApp {
    private app = express();
    private server: any;
    private socket: SocketIO.Socket;
    private game: Game;

    constructor(
        public readonly port: number,
        runFixtures: boolean = false
    ) {
        this.server = http.createServer(this.app);

        this._setEnv();
        this._initPassport();
        this._initDataBase();

        if (runFixtures) {
            this._runFixtures();
            return;
        }

        this._initMiddleWares();
        this._initRouter();
        this._initSockets();
        this._startGame();
        this._startServer();
    }

    private _runFixtures(): void {
        require('./fixtures/destinations').destinations();
    }

    private _setEnv(): void {
        if (process.env.NODE_ENV === 'production') {
            return;
        }
        dotenv.config();
    }

    private _initPassport(): void {
        require('./passport/serializer');
        require('./passport/local-strategy');
    }

    private _initDataBase(): void {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    }

    private _initMiddleWares(): void {
        this.app.use(flash());
        this.app.use(express.static(path.join(__dirname, '../dist/rpg')));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(sessionMiddleWare);
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
            sessionMiddleWare(socket.request, {}, next);
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
    }

    private _startGame(): void {
        this.game = new Game(this.socket);
    }

    private _startServer(): void {
        this.server.listen(this.port, () => console.log(`RPG listening on port ${this.port}!`));
    }
}
