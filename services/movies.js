const Movie = require('../model/movie');

exports.getMovies = async () => {
	const movies = await Movie.find();
	return movies;
};

exports.getMovieById = async _id => {
	const movie = await Movie.findById(_id);
	return movie;
};

exports.addMovie = async movie => {
	const newMovie = new Movie(movie);
	await newMovie.save();
	return newMovie;
};

exports.deleteMovie = async _id => {
	return Movie.findByIdAndDelete({ _id });
};
