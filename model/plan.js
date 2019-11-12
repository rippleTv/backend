const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
	name: { type: String, required: [true, 'Name of Plan is required'] },
	description: {
		type: String,
		required: [true, 'Description of Plan Required']
	},
	amount: { type: Number, required: [true, 'Amount for Plan is required'] },
	interval: {
		type: String,
		required: [true, 'Interval for plan payment is required']
	},
	plan_id: { type: String, required: [true, 'Plan Code is required'] },
	createdAt: { type: Date, required: true }
});

module.exports = mongoose.model('Plan', planSchema);
