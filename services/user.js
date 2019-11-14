const User = require('../model/user');
const bcrypt = require('bcryptjs');

const registerUser = function(Body) {
	let result = User.joiValidate({
		name: Body.name,
		email: Body.email,
		password: Body.password
	});
	if (result.error !== null) {
		return Promise.resolve({
			status: 400,
			message: result.error.details[0].message
		});
	}
	if (Body.password !== Body.password2) {
		return Promise.resolve({ status: 400, message: "Password doesn't match" });
	}

	return User.findOne({ email: Body.email })
		.then(user => {
			if (user) {
				return { status: 400, message: 'Email already exist' };
			}

			const newUser = new User({
				name: Body.name,
				email: Body.email,
				password: Body.password
			});

			newUser.save();
			return { user: newUser, status: 200, message: 'User successfully added' };
		})
		.catch(error => {
			throw error;
		});
};

const loginUser = function(Body) {
	let result = User.joiValidateLogin({
		email: Body.email,
		password: Body.password
	});

	if (result.error !== null) {
		return Promise.resolve({
			status: 400,
			message: result.error.details[0].message
		});
	}
	return User.findOne({ email: Body.email })
		.then(user => {
			if (!user) {
				return {
					status: 401,
					message: 'Auth Failed. Email or password is incorrect'
				};
			}
			return user.comparePassword(Body.password).then(match => {
				if (!match) {
					return {
						status: 401,
						message: 'Auth Failed. Email or password is incorrect'
					};
				}
				return { status: 200, message: 'Successfully logged in', user };
			});
		})
		.catch(error => {
			throw error;
		});
};

const verifyUser = _id => {
	return User.findOne({ verification_code: _id }).then(user => {
		if (!user.isVerified) {
			user.isVerified = true;
			user.save();
		}

		return user;
	});
};

const resetUserPassword = async ({ email, password }) => {
	const user = await User.findOne({ email: email });
	const result = { user: null };
	const { error } = User.validatePasswordReset({ password });

	if (error) {
		result.error = {
			message: error.details[0].message
		};
		return result;
	}
	user.password = password;
	await user.save();

	result.user = user;
	return result;
};

const validateUserEmail = email => {
	const { error } = User.validateMail({ email });
	console.log(error);
	if (error) {
		error.message = error.details[0].message;
		return error;
	}
	return null;
};

checkIfUserExists = async user => {
	let found = await User.findOne({ email: user.email });
	if (found) return true;
	return false;
};
module.exports = {
	registerUser,
	loginUser,
	verifyUser,
	resetUserPassword,
	validateUserEmail,
	checkIfUserExists
};
