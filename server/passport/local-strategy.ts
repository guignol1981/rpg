import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserModel from '../schemas/user';

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        console.log(username);
        console.log(password);

        UserModel.findOne({ email: username }, (err, user) => {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }
));
