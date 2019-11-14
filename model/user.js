const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const {
	schemaForLogin,
	schemaForSignup,
	schemaForEmailValidation,
	schemaForPasswordReset
} = require('./schema');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			lowercase: true,
			required: [true, 'Username is required']
		},

		email: {
			type: String,
			lowercase: true,
			required: [true, 'Email is required'],
			unique: true
		},
		password: {
			type: String,
			required: [true, 'Password is required']
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			lowercase: true,
			default: 'user'
		},
		subscription: {
			customer_id: { type: String },
			plan_id: { type: String },
			current_period_start: { type: Date },
			current_period_end: { type: Date },
			createdAt: { type: Date },
			expiresAt: { type: Date }
		},
		verification_code: { type: String, default: uuidv4() },
		isVerified: { type: Boolean, default: false }
	},

	{ timestamps: true }
);

// hash password before saving user
userSchema.pre('save', function(next) {
	const saltRounds = 10;
	bcrypt
		.hash(this.password, saltRounds)
		.then(hash => {
			this.password = hash;
			next();
		})
		.catch(err => next(err));
});

userSchema.statics.joiValidate = function(obj) {
	return Joi.validate(obj, schemaForSignup);
};

userSchema.statics.validatePasswordReset = function(obj) {
	return Joi.validate(obj, schemaForPasswordReset);
};

userSchema.statics.joiValidateLogin = function(obj) {
	return Joi.validate(obj, schemaForLogin);
};

userSchema.statics.validateMail = function(obj) {
	return Joi.validate(obj, schemaForEmailValidation);
};

userSchema.methods.comparePassword = function(plainPassword) {
	return bcrypt.compare(plainPassword, this.password).then(match => match);
};

module.exports = mongoose.model('User', userSchema);
