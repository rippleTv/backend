const {
	planSchema,
	subscriptionSchema,
	movieSchema
} = require('../middleware/schema');

function validatePlan(req, res, next) {
	const { error } = planSchema.validate(req.body);
	if (error) {
		return res.status(400).send({
			message: 'Bad Request',
			error: {
				name: error.name,
				message: error.details[0].message
			},
			data: null
		});
	}
	next();
}

function validateSubscription(req, res, next) {
	const { error } = subscriptionSchema.validate(req.body);
	if (error) {
		return res.status(400).send({
			message: 'Bad Request',
			error: {
				name: error.name,
				message: error.details[0].message
			},
			data: null
		});
	}
	next();
}

function validateMovie(req, res, next) {
	const { error } = movieSchema.validate(req.body);
	if (error) {
		return res.status(400).send({
			message: 'Bad Request',
			error: {
				name: error.name,
				message: error.details[0].message
			},
			data: null
		});
	}
	next();
}

module.exports = {
	validatePlan,
	validateSubscription,
	validateMovie
};
