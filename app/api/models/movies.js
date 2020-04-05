const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	Name: {
		type: String,
		trim: true,
		required: true,
	},
	Release_Date: {
		type: String,
		trim: true,
		required: true
	},
	Category: {
		type: String,
		trim: true,
		required: true
	},
	Description: {
		type: String,
		trim: true,
		required: true
	},
	Director: {
		type: String,
		trim: true,
		required: true
	},
	Stars: {
		type: String,
		trim: true,
		required: true
	},
	Ratings: {
		type: Number,
		trim: true,
		required: true
	}
});

module.exports = mongoose.model('Movie', MovieSchema)