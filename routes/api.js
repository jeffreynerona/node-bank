var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  res.render('api', { title: 'API' });
});

/* Get all users. */
router.get('/users', function(req, res, next) {
  var query = User.find();
  query.select('name card money');
  query.exec(function (err, users) {
    if (err) return handleError(err);
    res.json(users);
  });
});

/* Get a specific user by card number. */
router.get('/user/:card', function(req, res, next) {
  var query = User.findOne({'card':req.params.card});
  query.select('name card money');
  query.exec(function (err, user) {
    if (err) return handleError(err);
    res.json(user);
  });
});


module.exports = router;
