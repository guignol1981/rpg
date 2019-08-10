import express from 'express';
import CharacterModel from '../schemas/character';

const authenticate = require('../passport/authenticate').default;
const router = express.Router();

router.post('/create', authenticate, (req, res) => {
    const character = new CharacterModel({
        user: req.user,
        name: req.body.name
    });

    character.save().then(() => {
        res.send({
            data: true,
            msg: 'Character created'
        });
    });

});

export default router;
