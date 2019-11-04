const Joi = require('joi');

exports.planSchema = Joi.object().keys({
	name: Joi.string()
		.min(4)
		.required(),
	amount: Joi.number()
		.integer()
		.required(),
	interval: Joi.string()
		.valid('day', 'week', 'month', 'year')
		.required()
});

exports.subscriptionSchema = Joi.object().keys({
	plan_id: Joi.string()
		.min(4)
		.required(),
	token: Joi.string()
		.min(4)
		.required()
});
