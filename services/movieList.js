const movieList = require('../model/movieList');

exports.addToMovieList = async body => {
	const found = await movieList.findOne({ movie: body.movieId });
	if (!found) {
		const newMovieList = new movieList({
			user: body.user._id,
			movie: body.movieId
		});
		await newMovieList.save();
		return newMovieList;
	}
	return found;
};

exports.getMovieList = async id => {
	const movies = await movieList.find({ user: id }).populate('movies');
	return movies;
};

exports.checkIfMovieIsInList = async ({ userId, movieId }) => {
	const movie = await movieList.findOne({ user: userId, movie: movieId });
	return movie;
};

exports.deleteFromMovieList = async body => {
	const deletedMovie = await movieList.findOneAndDelete({
		movie: body.movieId,
		user: body.userId
	});
	return deletedMovie;
};
