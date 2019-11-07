require('dotenv').config();

const config = {};
const JWT_KEY = process.env.JWT_KEY || 'randomtokenkey';
const MONGO_URI = 'mongodb://localhost:27017/RippleTv';
const env = process.env.NODE_ENV || 'development';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

config.development = {
	JWT_KEY,
	MONGO_URI,
	PORT: 8080,
	STRIPE_SECRET_KEY,
	SENDGRID_API_KEY
};

config.production = {
	JWT_KEY: JWT_KEY,
	MONGO_URI: process.env.MONGO_URI || MONGO_URI,
	PORT: process.env.PORT || 8080,
	STRIPE_SECRET_KEY,
	SENDGRID_API_KEY
};

module.exports = config[env] ? config[env] : config['development'];
