const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../model/user');

function getToken(req) {
	let token = null;
	if (req.headers && req.headers['x-auth-token']) {
		token = req.headers['x-auth-token'];
	}
	return token;
}

async function authenticate(req, res, next) {
	try {
		const token = getToken(req);
		//if token is not present in the http header
		if (!token) {
			return res.status(401).send({
				message: 'Unauthorized. Access Denied',
				data: null,
				error: null
			});
		}

		const decoded = jwt.verify(token, config.JWT_KEY);
		const user = await User.findOne({
			email: decoded.email
		}).select('name role email subscription isVerified');
		//if user does not exist in database
		if (!user) {
			return res.status(401).send({
				message: 'Unauthorized. Access Denied',
				data: null,
				error: null
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		if (error.name === 'JsonWebTokenError') {
			return res.status(401).send({
				message: 'Invalid Token. Access Denied',
				data: null,
				error: error
			});
		}
		next(error);
	}
}

function authorize(req, res, next) {
	const { role } = req.user;
	if (role !== 'admin') {
		return res.status(403).send({
			message: 'Forbidden. Access Denied',
			data: null,
			error: null
		});
	}
	next();
}

module.exports = {
	authorize,
	authenticate
};
