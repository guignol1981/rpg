import { Request, Response } from 'express';

export default function authenticate(req: Request, res: Response, next: () => void): void {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({
            data: false,
            msg: 'Unauthorized'
        });
    }
}
