const movieServices = require('../services/movies');
// const movie = new Movie()

//Get all the movies
exports.getAllMovie = async (req, res, next) => {
	const movies = await movieServices.getMovies();
	return movies;
};

//Get one movie
exports.getMovie = async (req, res) => {
	let _id = req.params.id;
	const movie = await movieServices.getMovies(_id);
	if (!movie) {
		return res.status(404).res.send({
			message: 'Movie Not found',
			error: null
		});
	}

	return res.status(200).send({
		message: 'Request Succesful',
		data: movie
	});
};

//Post / Upload a movie
exports.uploadMovie = async (req, res) => {
	const movie = await movieServices.addMovie(req.body);

	res.status(201).json({
		message: 'Movie was successfully uploaded!',
		status: 'success',
		data: movie
	});
};

//patch /update a movie
exports.updateMovie = async (req, res) => {
	const _id = req.params.id;
	let { name, genre, category, releaseYear, isReleased } = req.body;

	try {
		const movie = await Movie.findByIdAndUpdate({ _id }, req.body, {
			new: true
			// runValidators: true
		});
		res.status(200).json({
			message: 'Successfully updated movie!',
			data: {
				movie
			}
		});
	} catch (error) {
		next(error);
	}
};

//Delete a movie
exports.deleteMovie = async (req, res) => {
	const _id = req.params.id;
	await movieServices.deleteMovie(_id);
	res.status(200).json({
		message: 'successfully deleted!'
	});
};
