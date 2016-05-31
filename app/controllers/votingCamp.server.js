'use strict';

//var url = require("url");
//var request = require('request');
var ys = require('ys-hash');
var Poll = require('../models/polls.js');
ys.set_mask_len(70);

function VotingCamp() {

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

  var getDataGraph = function(options) {
    var data = [];
    for(var i in options) {
      if(options[i].votes.length) {
        data.push({ label: options[i].name, value: options[i].votes.length });
      }
    }
    return data;
  }

  this.addVote = function(req, res) {
    var hash = req.body.hash;
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    var option = parseInt(req.body.option);
		Poll.findOne({ 'hash': hash }, function(err, poll) {
      if (err) throw err;
      if (!ipInList(poll.options, ip)) {
        poll.votes++;
        poll.options[option].votes.push({ip: ip});
        poll.save();
        res.json(getDataGraph(poll.options));
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
    var hash = req.params.hash;
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var share  = 'https://twitter.com/intent/tweet?hashtags=poll,fcc&text=';
    Poll.findOne({ 'hash': hash }, { _id: false, __v: false }, function(err, poll) {
      if (err) throw err;
      share += poll.title + ' Vote at ' + fullUrl;
      var data_graph = getDataGraph(poll.options);
      res.render('poll', { poll: poll, share: share, data_graph: data_graph })
    });
  };

};

module.exports = VotingCamp;
