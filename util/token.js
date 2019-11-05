const jwt = require('jsonwebtoken');
const config = require('../config');

//JWT generation
exports.jwtGeneration = user => {
	const token = jwt.sign(user, config.JWT_KEY, {
		expiresIn: '30d'
	});
	return token;
};
