const jwt = require('jsonwebtoken');
const config = require('../config');

//JWT generation
exports.jwtGeneration = user => {
	const token = jwt.sign(user, config.JWT_KEY, {
		expiresIn: '30d'
	});
	return token;
};

//jwt generation for passsword
exports.passwordJWT = email => {
	const token = jwt.sign({ email }, config.JWT_KEY, { expiresIn: '1d' });
	return token;
};
