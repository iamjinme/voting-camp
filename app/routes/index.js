'use strict';

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
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
    ensureLoggedIn('/'),
    function(req, res){
      res.render('dashboard', { user: req.user });
    });

  app.get('/admin/new',
    ensureLoggedIn('/'),
    function(req, res){
      res.render('new', { user: req.user });
    });

  app.get('/admin/polls',
    require('connect-ensure-login').ensureLoggedIn('/'),
    votingCamp.myPolls);

  app.get('/polls/:hash',
    votingCamp.showPoll);

  app.get('/polls',
    votingCamp.showPolls);

  app.get('/profile',
    ensureLoggedIn('/'),
    function(req, res){
      res.render('profile', { user: req.user });
    });

  app.post('/api/polls',
    ensureLoggedIn('/'),
    votingCamp.newPoll);

  app.post('/api/vote',
    votingCamp.addVote);

  app.post('/api/option',
    ensureLoggedIn('/'),
    votingCamp.addOption);

  app.delete('/api/polls/:hash',
    ensureLoggedIn('/'),
    votingCamp.delPoll);

};
