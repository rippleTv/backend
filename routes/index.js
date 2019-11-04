const router = require('express').Router();

const userRoute = require('./userRoute');
const subscriptionRoute = require('./subscription');

module.exports = function(router) {
	router.use('/user', userRoute());

	router.use('/subscription', subscriptionRoute());
	return router;
};
