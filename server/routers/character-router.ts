import express, { Request, Response } from 'express';
import CharacterModel from '../schemas/character';
import DestinationModel from '../schemas/destination';

const authenticate = require('../passport/authenticate').default;
const router = express.Router();

router.post('/create', authenticate, (req: Request, res: Response) => {
    const character = new CharacterModel({
        user: req.user,
        name: req.body.name
    });

    DestinationModel.findOne({ isDefault: true }).exec((err, destination) => {
        character.destination = destination;

        req.user.character = character;

        req.user.save();

        character.save().then(() => {
            res.send({
                data: true,
                msg: 'Character created'
            });
        });
    });
});

export default router;
