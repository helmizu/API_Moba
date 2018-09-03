const express = require('express');
const router = express.Router();
const passport = require('passport')
const users = require('../controller/users')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/current', passport.authenticate('jwt', {session : false }), (req, res) =>{
  res.json(req.user)
})

router.post('/register', users.registerUser)

router.post('/login', users.loginUser)


module.exports = router;
