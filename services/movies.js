const Movie = require('../model/movie');
const cloudinary = require('cloudinary');
const path = require('path');

exports.getMovies = async () => {
	const movies = await Movie.find();
	return movies;
};

exports.getMovieById = async _id => {
	const movie = await Movie.findOne({ _id });
	console.log('############# SERVICES ######################');
	console.log(_id);
	console.log(movie);
	console.log('############# SERVICES ######################');
	return movie;
};

exports.addMovie = async (movie, cb) => {
	const up_options = {
		resource_type: 'video',
		type: 'upload',
		eager: [{ streaming_profile: 'hd', format: 'mpd' }],
		eager_async: true
	};

	const publicId = path.parse(movie.url).name;
	const result = await cloudinary.v2.uploader.explicit(publicId, up_options);

	movie.dash = result.eager[0].secure_url;
	movie.bytes = result.bytes;
	movie.publicId = publicId;

	const newMovie = new Movie(movie);
	await newMovie.save();
	return newMovie;
};

exports.deleteMovie = async _id => {
	return Movie.findByIdAndDelete({ _id });
};
