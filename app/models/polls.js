'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vote = new Schema({
	ip: String
});

var Options = new Schema({
	name: String,
	vote: [Vote]
});

var Poll = new Schema({
	user: Number,
	title: String,
	date: Date,
	options: [Options]
});

module.exports = mongoose.model('Poll', Poll);
