'use strict';

//var FileUpload = require(process.cwd() + '/app/controllers/fileUpload.server.js');

module.exports = function (app) {
  
  //var fileUpload = new FileUpload();
  
  app.route('/')
      .get(function (req, res) {
          res.sendFile(process.cwd() + '/public/index.html');
      });

  //app.route('/upload')
  //    .post(fileUpload.getInfo);

};
