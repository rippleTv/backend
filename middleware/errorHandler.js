module.exports = (error, req, res, next) => {
	const status = error.status || 500;
	const err = process.env.NODE_ENV === 'development' ? error : {};
	res.status(status).send({
		message: error.message || 'Internal Server Error',
		data: null,
		error: err
	});
};
