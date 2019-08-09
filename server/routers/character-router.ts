import express from 'express';
const authenticate = require('../passport/authenticate').default;

const router = express.Router();

router.post('/create', authenticate, (req, res) => {
    res.send({
        data: true,
        msg: 'route work'
    });
});

export default router;
