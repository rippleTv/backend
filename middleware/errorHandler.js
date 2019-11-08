module.exports = (error, req, res, next) => {
	console.log('ERROR');
	const status = error.status || 500;
	const err = process.env.NODE_ENV === 'production' ? {} : error;

	res.status(status).send({
		message: error.message || 'Internal Server Error',
		data: null,
		error: err
	});
};
