const Plan = require('../model/plan');
const User = require('../model/user');
const config = require('../config');

const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

async function createPlan(plan) {
	const newPlan = await stripe.plans.create({
		amount: plan.amount,
		currency: 'usd',
		interval: plan.interval,
		product: {
			name: plan.name
		},
		trial_period_days: 30
	});

	return newPlan;
}

/**
 * This saves a plan to the database
 * @param {Object} plan The response from successful creation of a plan in paystack
 */
async function savePlan(plan) {
	const newPlan = new Plan({
		name: plan.name,
		description: plan.description,
		amount: plan.amount,
		interval: plan.interval,
		plan_id: plan.id,
		createdAt: plan.created
	});

	newPlan.save();
	return newPlan;
}

async function subscribeUser(body) {
	const user = await User.findOne({ email: body.email });
	if (user) {
		const customer = await stripe.customers.create({
			source: body.token, // Token retrieved from Elements, Checkout, or native SDKs.
			email: body.email
		});

		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			plan: body.plan_id
		});

		user.subscription.customer_id = customer.id;
		user.subscription.created = subscription.created;
		user.subscription.current_period_end = subscription.current_period_end;
		user.subscription.current_period_start = subscription.current_period_start;
		user.subscription.plan_id = body.plan_id;
		user.save();

		return user;
	}
}

module.exports = {
	savePlan,
	createPlan,
	subscribeUser
};
