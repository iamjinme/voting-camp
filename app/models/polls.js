'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vote = new Schema({
	ip: String
});

var Options = new Schema({
	name: String,
	votes: [Vote]
});

var Poll = new Schema({
	user_id: String,
	title: String,
	hash: String,
	date: Date,
	votes: Number,
	options: [Options]
});

module.exports = mongoose.model('Poll', Poll);
