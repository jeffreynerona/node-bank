var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

/* Get login page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
  	res.redirect('/member');
  } else {
  	res.render('login', { title: 'Login' });
  }
});

/* Proccess Login */
router.post('/', function(req, res, next) {
  var email = req.body.email;
  var pass = req.body.password;
  var query = User.findOne({ 'email': email, 'password':pass });
  query.select('id email password');
  query.exec(function (err, user) {
  if (err) return handleError(err);
  	console.log('Email: %s, Password: %s', user.email, user.password);
  	res.cookie('logged',user.id);
  	res.redirect('/member');
  });
});
module.exports = router;
