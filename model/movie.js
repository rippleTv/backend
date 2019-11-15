const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'The name of the movie is required']
	},
	poster: { type: String, required: [true, 'Poster image required'] },
	publicId: { type: String, required: [true, 'Cloudinary public id required'] },
	poster: { type: String, required: [true, 'Poster Image for video required'] },
	genre: {
		type: String,
		lowercase: true,
		required: [true, 'The movie genre is required']
	},
	description: { type: String },
	url: { type: String, required: [true, 'Movie url is required'] },
	dash: { type: String, required: true },
	bytes: { type: Number, required: [true, 'Number of bytes for movie'] },
	category: {
		type: String,
		required: [true, 'The movie category is required']
	},
	image: { type: String },
	releaseYear: {
		type: Number,
		required: [true, 'The release date of the movie is required']
	}
});
const Movies = mongoose.model('Movies', moviesSchema);
module.exports = Movies;
