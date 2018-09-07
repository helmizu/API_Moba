const DBLoc = process.env.DATABASE_HOST || "localhost"
const DB = process.env.DATABASE_NAME || "MobaCup"
const secretOrKey = process.env.SECRETORKEY || "AwesomeKey"

const url = 'mongodb://' + DBLoc + ':27017';
const dbName = DB;
const key = secretOrKey
module.exports = {
    mongoURI : url,
    dbName : dbName,
    secretOrKey : key,
}