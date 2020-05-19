const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Member = mongoose.model("members");
const keys = require("./keys");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Member.findById(jwt_payload.id)
                .then(member => {
                    if (member) {
                        return done(null, member);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};