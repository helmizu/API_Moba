const express = require('express');
const router = express.Router();
const passport = require('passport')
const users = require('../controller/users')

router.get('/current', passport.authenticate('jwt', {session : false }), (req, res) =>{
  res.json(req.user)
})

router.get('/', users.getUsers)
router.get('/detail/:id', users.getUser)

router.post('/register', users.registerUser)

router.post('/login', users.loginUser)
router.post('/login/admin', users.loginAdmin)


module.exports = router;
