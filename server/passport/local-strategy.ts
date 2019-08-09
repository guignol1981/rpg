import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserModel from '../schemas/user';

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, done) => {
        UserModel.findOne({ email }, (err, user) => {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { msg: 'Incorrect email.' });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { msg: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }
));
