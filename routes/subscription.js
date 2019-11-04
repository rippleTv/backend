const router = require('express').Router();
const SubscriptionController = require('../controller/subscriptionController');
const {
	validatePlan,
	validateSubscription
} = require('../middleware/validation');

const { authenticate } = require('../middleware/auth');

module.exports = () => {
	router.post(
		'/plan',
		[authenticate, validatePlan],
		SubscriptionController.createPlan
	);

	router.post(
		'/',
		[validateSubscription, authenticate],
		SubscriptionController.subscribeUser
	);

	return router;
};
