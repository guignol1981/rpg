export default function authenticate(req, res, next): void {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({
            data: false,
            msg: 'Unauthorized'
        });
    }
}
