const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const mongodb = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        mongodb.connect(keys.mongoURI, { useNewUrlParser : true }, function (err, client) {
            client.db(keys.dbName).collection('user').find({ _id : new ObjectID(jwt_payload._id)}).toArray(function (err, user) {
                if (err) return done(err, null)
                if (user) return done(null, user[0])
                else return done(null, false)
            })
        })
    }))
}
