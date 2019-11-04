require('dotenv').config();

const config = {};
const JWT_KEY = 'randomtokenkey';
const MONGO_URI = 'mongodb://localhost:27017/basic-auth';
const env = process.env.NODE_ENV;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

config.development = {
	JWT_KEY,
	MONGO_URI,
	PORT: 3000,
	STRIPE_SECRET_KEY
};

config.production = {
	JWT_KEY: process.env.JWT_KEY || JWT_KEY,
	MONGO_URI: process.env.MONGO_URI || MONGO_URI,
	PORT: process.env.PORT || 8080,
	STRIPE_SECRET_KEY
};

module.exports = config[env] ? config[env] : config['development'];
