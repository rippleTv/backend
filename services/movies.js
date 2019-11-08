const Movie = require('../model/movie');
const cloudinary = require('cloudinary');

exports.getMovies = async () => {
	const movies = await Movie.find();
	return movies;
};

exports.getMovieById = async _id => {
	const movie = await Movie.findById(_id);
	return movie;
};

exports.addMovie = async (movie, cb) => {
	const up_options = {
		resource_type: 'video',
		type: 'upload',
		eager: [{ streaming_profile: 'hd', format: 'mpd' }],
		eager_async: true
	};

	// const result = await cloudinary.v2.uploader.explicit(
	// 	'THE_WEDDING_PARTY',
	// 	up_options
	// );

	cloudinary.v2.uploader.explicit('THE_WEDDING_PARTY', up_options, function(
		error,
		result
	) {
		cb(result);
	});

	// console.log(result);
	// movie.transformation.hls.url = result.transformation.find(
	// 	t => t.transformation === 'sp_hd/m3u8'
	// ).secure_url;
	// movie.transformation.dash.url = result.transformation.find(
	// 	t => t.transformation === 'sp_hd/mpd'
	// ).secure_url;
	// movie.bytes = result.bytes;
	// movie.publicId = movie.name;

	// const newMovie = new Movie(movie);
	// await newMovie.save();
	// return newMovie;
};

exports.deleteMovie = async _id => {
	return Movie.findByIdAndDelete({ _id });
};
