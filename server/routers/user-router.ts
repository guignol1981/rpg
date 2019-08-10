import express = require('express');
import { Request, Response } from 'express';
import passport from 'passport';
import UserModel from '../schemas/user';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
    res.send({
        data: true,
        msg: 'Login successful'
    });
});

router.post('/logout', (req: Request, res: Response) => {
    req.logout();

    res.send({
        data: true,
        msg: 'Logout successful'
    });
});

router.post('/username-avaibility', (req: Request, res: Response) => {
    UserModel.find({ username: req.body.username }).exec((err, docs) => {
        if (err) { throw err; }

        res.send({
            data: !docs.length,
            msg: !!docs.length ? 'username not available' : 'username available'
        });
    });
});

router.post('/email-avaibility', (req: Request, res: Response) => {
    UserModel.find({ email: req.body.email }).exec((err, docs) => {
        if (err) { throw err; }

        res.send({
            data: !docs.length,
            msg: !!docs.length ? 'email not available' : 'email available'
        });
    });
});

router.post('/register', (req: Request, res: Response) => {
    const registerData: any = req.body;
    const user = new UserModel(registerData);

    user.setPassword(registerData.password);

    user.save((err) => {
        if (err) { throw err; }

        req.login(user, () => {
            res.send({
                data: true,
                msg: 'Registration successful'
            });
        });
    });
});

export default router;
