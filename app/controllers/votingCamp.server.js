'use strict';

//var url = require("url");
//var request = require('request');
var ys = require('ys-hash');
var Poll = require('../models/polls.js');
ys.set_mask_len(70);

function VotingCamp() {

  var cx_id = process.env.CX_ID;
  var api_key = process.env.API_KEY;
  var self = this;

  var ipInList = function(array, ip) {
    var list = [];
    var ret = false;
    // Join Options votes
    for(var i in array) {
      list = list.concat(array[i].votes);
    }
    // Verify Ip in list
    for(var i in list) {
      if (list[i].ip === ip) {
        ret = true;
        break;
      }
    }
    return ret;
  }

  this.countLatest = function() {
    Latest.count({}, function( err, count){
      return count;
    });
  };

  this.getSearch = function(req, res) {
    var query = url.parse(req.url, true).query
    var offset = parseInt(query.offset || "0");
    var api_url  = 'https://www.googleapis.com/customsearch/v1/';
        api_url += '?q=' + req.params.term;
        api_url += '&searchType=image';
        api_url += '&key=' + api_key;
        api_url += '&cx=' + cx_id;
        if (offset > 0)
          api_url += '&start=' + offset;
    // Save search
    self.saveSearch(req.params.term);
    // Call API Custom Search Google
    request(api_url, function (error, response, body) {
      var items = [];
      if (!error && response.statusCode == 200) {
        var data = JSON.parse(body).items;
        for (var i in data) {
          items.push({ "url": data[i].link,
                       "title": data[i].title,
                       "thumbnail": data[i].image.thumbnailLink,
                       "context": data[i].image.contextLink
          });
        };
        res.json(items);
      };
    });
  };

  this.addVote = function(req, res) {
    var hash = req.body.hash;
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    var option = parseInt(req.body.option);
		Poll.findOne({ 'hash': hash }, { '_id': false }, function(err, poll) {
      if (err) throw err;
      if (!ipInList(poll.options, ip)) {
        poll.votes++;
        poll.options[option].votes.push({ip: ip});
        poll.save();
        res.json(poll);
      } else {
        res.json({ error: true, message: 'Sorry, you voted for this poll before!' });
      };
    });
  };

  this.newPoll = function(req, res) {
    var options = [];
    for (var i in req.body.options) {
      options.push({'name': req.body.options[i], 'votes': []});
    }
    var poll = new Poll({
      'user_id': req.user._id,
      'title': req.body.title,
      'hash': ys.hash(req.body.title),
      'date': new Date(),
      'votes': 0,
      'options': options
    });
    poll.save(function(err, doc) {
      if(err) throw err;
      res.json(doc);
    });
  }

  this.showPoll = function(req, res) {
    var data_graph = [
        {label: "Download Sales", value: 12},
        {label: "In-Store Sales", value: 30},
        {label: "Mail-Order Sales", value: 20}
      ];
    var hash = req.params.hash;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var share  = 'https://twitter.com/intent/tweet?hashtags=poll,fcc&text=';
    Poll.findOne({ 'hash': hash }, { _id: false, __v: false }, function(err, poll) {
      if (err) throw err;
      share += poll.title + ' Vote in: ' + fullUrl;
      res.render('poll', { poll: poll, share: share, data_graph: data_graph })
    });
  };

};

module.exports = VotingCamp;
