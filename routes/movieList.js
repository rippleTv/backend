const router = require('express').Router();
const MovieListController = require('../controller/movieListController');
const { authenticate, authorize } = require('../middleware/auth');

const auth = [authenticate, authorize];

module.exports = () => {
	const movieListCtl = new MovieListController();
	router.get('/all', authenticate, movieListCtl.GetAllMovies);
	router.post('/addtoList', authenticate, movieListCtl.AddMovie);
	router.delete('/:id', authenticate, movieListCtl.deleteFromMovieList);

	return router;
};
