import { Request, Response } from 'express';

export default function authenticate(req: Request, res: Response, next: () => void): void {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({
            data: false,
            msg: 'Unauthorized'
        });
    }
}
