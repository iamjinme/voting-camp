'use strict';

var VotingCamp = require(process.cwd() + '/app/controllers/votingCamp.server.js');

module.exports = function (app, passport) {

  var votingCamp = new VotingCamp();

  app.route('/')
    .get(function (req, res) {
      res.render('index', { title: 'PollStar :: Back End Basejump FreeCodeCamp', user: req.user});
    });

  app.get('/login/twitter',
    passport.authenticate('twitter'));

  app.get('/login/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/admin');
    });

  app.get('/logout',
    function(req, res) {
      req.session.destroy();
      res.redirect('/');
    });

  app.get('/admin',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
      res.render('dashboard', { user: req.user });
    });

  app.get('/admin/new',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
      res.render('new', { user: req.user });
    });

  app.get('/admin/polls',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
      res.render('my', { user: req.user });
    });

  app.route('/polls/:hash')
      .get(votingCamp.showPoll);
      
  app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn('/'),
    function(req, res){
      res.render('profile', { user: req.user });
    });

  app.route('/api/polls')
      .post(votingCamp.newPoll);



};
