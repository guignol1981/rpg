import express = require('express');
import passport from 'passport';
import UserModel from '../schemas/user';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({
        data: true,
        msg: 'Login successful'
    });
});

router.post('/logout', (req, res) => {
    req.logout();
    res.send({
        msg: 'Logout successful'
    });
});

router.post('/username-avaibility', (req, res) => {
    UserModel.find({ username: req.body.username }).exec((err, docs) => {
        res.send({
            data: !docs.length,
            msg: !!docs.length ? 'username not available' : 'username available'
        });
    });
});

router.post('/email-avaibility', (req, res) => {
    UserModel.find({ email: req.body.email }).exec((err, docs) => {
        res.send({
            data: !docs.length,
            msg: !!docs.length ? 'email not available' : 'email available'
        });
    });
});

router.post('/register', (req, res) => {
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

export default router;
