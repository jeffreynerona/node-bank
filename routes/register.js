var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

/* Get register page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
  	res.redirect('/member');
  } else {
  	res.render('register', { title: 'Register' });
  }
});

/* Proccess Register*/
router.post('/', function(req, res, next) {
  var user = new User({
  	name: req.body.name,
  	card: req.body.card,
  	password: req.body.password,
  	email: req.body.email
  });

  user.save();
  res.render('login', { title: 'Login' });
});
module.exports = router;
