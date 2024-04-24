import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {ACCESS_TOKEN_SECRET} from "../constants/environmet.js";
import User from '../models/User.model.js';

function serializeUser(user, done) {
    done(null, user.id);
}

function deserializeUser(user, done) {
    done(null, user);
}

function configureJwtStrategy(passport){
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: ACCESS_TOKEN_SECRET
    }, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error,false);
        }
    }));
}

export default function configurePassport(passport) {
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    configureJwtStrategy(passport);
}