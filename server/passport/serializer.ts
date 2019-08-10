import passport from 'passport';
import UserModel from '../schemas/user';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id).populate('character').exec((err, user) => {
        done(err, user);
    });
});
