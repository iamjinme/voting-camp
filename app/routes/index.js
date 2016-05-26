'use strict';

//var FileUpload = require(process.cwd() + '/app/controllers/fileUpload.server.js');

module.exports = function (app, passport) {

  //var fileUpload = new FileUpload();

  app.route('/')
    .get(function (req, res) {
      console.log(req.user);
      res.render('index', { title: 'Voting Camp :: Back End Basejump FreeCodeCamp', user: req.user});
      //res.sendFile(process.cwd() + '/public/index.html');
    });

  app.get('/login/twitter',
    passport.authenticate('twitter'));

  app.get('/login/twitter/return', 
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
    });
  
  //app.route('/upload')
  //    .post(fileUpload.getInfo);

};
