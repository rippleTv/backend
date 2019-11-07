const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'The name of the movie is required']
	},
	publicId: { type: String, required: [true, 'Cloudinary public id required'] },
	poster: { type: String, required: [true, 'Poster Image for video required'] },
	genre: {
		type: String,
		lowercase: true,
		required: [true, 'The movie genre is required']
	},
	description: { type: String },
	url: { type: String, required: [true, 'Movie url is required'] },
	transformation: {
		dash: {
			url: {
				type: String,
				required: [true, 'Dash manifest for video required']
			}
		},
		hls: {
			url: {
				type: String,
				required: [true, 'HLS format for video required']
			}
		}
	},
	bytes: { type: Number, required: [true, 'Number of bytes for movie'] },
	category: {
		type: String,
		required: [true, 'The movie category is required']
	},
	duration: { type: Date, required: [true, 'Movie Duration is required'] },
	releaseDate: {
		type: Number,
		required: [true, 'The release date of the movie is required']
	}
});
const Movies = mongoose.model('Movies', moviesSchema);
module.exports = Movies;
