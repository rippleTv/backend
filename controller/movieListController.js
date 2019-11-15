const movieListService = require('../services/movieList');

function movieListController() {
	this.AddMovie = async function AddMovie(req, res) {
		const body = {
			movieId: req.body.movieId,
			user: req.user
		};

		console.log(body);
		const result = await movieListService.addToMovieList(body);
		return res.status(200).send({
			message: 'Request Succesful',
			data: result
		});
	};

	this.GetAllMovies = async function GetAllMovies(req, res) {
		let id = req.user._id;
		const result = await movieListService.getMovieList(id);
		return res.status(200).send({
			message: 'Request Successful',
			data: result
		});
	};

	this.deleteFromMovieList = async function deleteFromMovieList(req, res) {
		let body = {};
		console.log(req.user);
		body.userId = req.user._id;
		body.movieId = req.params.id;
		const result = await movieListService.deleteFromMovieList(body);
		return res.status(200).send({
			message: 'Request Successful',
			data: result
		});
	};

	this.checkIfMovieIsInList = async function checkIfMovieIsInList(req, res) {
		let body = {
			movieId: req.body.movie,
			userId: req.user._id
		};
		const result = await movieListService.checkIfMovieIsInList(body);
		return res.status(200).send({
			message: 'Request successful',
			data: result
		});
	};
}

module.exports = movieListController;
