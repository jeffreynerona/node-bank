var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

var userdata;

/* Get member page. */
router.get('/', function(req, res, next) {
  if(req.cookies.logged){
    var uid = req.cookies.logged;
    var query = User.findOne({ '_id' : uid });
    query.select('name email money card image_url');
    query.exec(function (err, user) {
    if (err) return handleError(err);
      userdata=user;
      res.render('member', { userdata: user, title: 'member', action:'MAIN' });
    });
  } else {
    res.redirect('/login');
  }
});
router.get('/withdraw', function(req, res, next) {
  res.render('member', { action: 'WITHDRAW', userdata: userdata, title: 'Withdraw' });
});
router.get('/deposit', function(req, res, next) {
  res.render('member', { action: 'DEPOSIT', userdata: userdata, title: 'Deposit' });
});
router.get('/logout', function(req, res, next) {
  res.clearCookie("logged");
  res.redirect('/login');
});
router.get('/trasact', function(req, res, next) {
  res.send('it goes to get');
});
router.post('/trasact', function(req, res, next) {
  console.log('transact working');
  var amount = req.body.amount;
  var card = req.body.card;
  var action = req.body.action;
  var query = User.findOne({ 'card' : card });
    query.select('name email money card image_url');
    query.exec(function (err, user) {
    if (err) return handleError(err);
      if(action='DEPOSIT'){
        var newAmount = amount + user.money;
        User.updateOne(
          { "card" : card },
          { $set: { "money" : newAmount } }
       );
      };
      if(action='WITHDRAWW'){
        var newAmount = user.money - amount;
        User.updateOne(
          { "card" : card },
          { $set: { "money" : newAmount } }
       );
      };
      res.redirect('/member');
    });
});
module.exports = router;
