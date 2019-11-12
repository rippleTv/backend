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
		.required(),
	description: Joi.string()
		.min(4)
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

exports.movieSchema = Joi.object().keys({
	name: Joi.string()
		.min(2)
		.required(),
	poster: Joi.string()
		.min(4)
		.required(),
	category: Joi.string()
		.min(2)
		.required(),
	genre: Joi.string()
		.min(3)
		.required(),
	description: Joi.string(),
	url: Joi.string()
		.min(5)
		.required(),
	releaseYear: Joi.number().required()
});
