import flash from 'connect-flash';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import BattleLobby from './models/battle-lobby';
import WhiteMage from './models/characters/white-mage';
import UserModel from './schemas/user';
import bodyParser = require('body-parser');
import express = require('express');
import expressSession = require('express-session');

export default class RpgApp {
    private app = express();
    private router = express.Router();
    private server: any;
    private io: any;
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
            saveUninitialized: true
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private _initRouter(): void {
        this.router.post('/users/login', passport.authenticate('local'), (req, res) => {
            res.send({
                msg: 'Login successful'
            });
        });

        this.router.post('/users/logout', (req, res) => {
            req.logout();
            res.send({
                msg: 'Logout successful'
            });
        });

        this.router.post('/users/username-avaibility', (req, res) => {
            UserModel.find({ username: req.body.username }).exec((err, docs) => {
                res.send({
                    data: !docs.length,
                    msg: !!docs.length ? 'username not available' : 'username available'
                });
            });
        });

        this.router.post('/users/email-avaibility', (req, res) => {
            UserModel.find({ email: req.body.email }).exec((err, docs) => {
                res.send({
                    data: !docs.length,
                    msg: !!docs.length ? 'email not available' : 'email available'
                });
            });
        });

        this.router.post('/users/register', (req, res) => {
            const registerData: any = req.body;
            const userModel = new UserModel(registerData);

            userModel.setPassword(registerData.password);

            userModel.save().then((user) => {
                req.login(user, () => {
                    res.send({
                        msg: 'Registration successful'
                    });
                });
            });
        });

        this.app.use('/api', this.router);
        this.app.get('*', (req: any, res: any) => res.sendFile(path.join(__dirname, '../dist/rpg/index.html')));
    }

    private _initSockets(): void {
        this.io = require('socket.io')(this.server);

        this.io.on('connection', (socket) => {
            console.log('a user connected');

            const character: WhiteMage = new WhiteMage(1, 1, 'test');

            this.battleLobby.characters.push(character);

            this.io.emit('battle-lobby', this.battleLobby);

            console.log('there is ' + this.battleLobby.characters.length + ' in the battle lobby');
        });
    }

    private _startServer(): void {
        this.server.listen(this.port, () => console.log(`RPG listening on port ${this.port}!`));
    }
}
