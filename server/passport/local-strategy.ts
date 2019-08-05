import passport from 'passport';
import UserModel from '../schemas/user';
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    (username, password, done) => {
        UserModel.findOne({ username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
