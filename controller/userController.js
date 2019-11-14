const {
	registerUser,
	loginUser,
	verifyUser,
	resetUserPassword,
	validateUserEmail,
	checkIfUserExists
} = require('../services/user');
const { jwtGeneration } = require('../util/token');
const {
	sendConfirmEmailMessage,
	sendResetPasswordMail
} = require('../services/mailer');

const { passwordJWT } = require('../util/token');

function AuthController() {
	this.registerUser = async (req, res, next) => {
		const result = await registerUser(req.body);
		if (result.user) await sendConfirmEmailMessage(result.user);
		return res.status(result.status).send({
			data: null,
			message: result.message,
			error: null
		});
	};

	this.loginUser = (req, res, next) => {
		loginUser(req.body)
			.then(result => {
				if (result.status >= 400) {
					return res.status(result.status).send({
						data: null,
						message: result.message,
						error: null
					});
				}

				if (result.status === 200) {
					const data = {};
					data.email = result.user.email;
					data.role = result.user.role;
					const token = jwtGeneration(data);
					return res.status(result.status).send({
						data: {
							...data,
							token
						},
						message: result.message,
						error: null
					});
				}
			})
			.catch(error => {
				next(error);
			});
	};

	this.verifyUser = (req, res, next) => {
		const { id } = req.params;
		verifyUser(id)
			.then(user => {
				return res.redirect('https://rippletv.netlify.com/confirm');
			})
			.catch(error => next(error));
	};

	this.getUserData = (req, res, next) => {
		return res.status(200).send({
			data: req.user
		});
	};

	this.sendResetPassordMail = async (req, res, next) => {
		const { email } = req.body;
		const error = validateUserEmail(email);

		if (error) {
			return res.status(401).send({
				message: error.message
			});
		}

		const user = await checkIfUserExists({ email });
		const token = passwordJWT(email);
		if (user) {
			await sendResetPasswordMail({ token, email });
		}

		return res.status(200).send({
			message: 'Password Reset Mail send'
		});
	};

	this.resetUserPassword = async (req, res, next) => {
		const { user, error } = await resetUserPassword({
			email: req.user.email,
			password: req.body.password
		});

		if (error) {
			return res.status(401).send({
				message: error.message,
				error
			});
		}

		if (!user) {
			return res.status(404).send({
				message: 'Password Reset Failed. User not found'
			});
		}

		return res.status(200).send({
			message: 'Password Reset was successful'
		});
	};
}

module.exports = AuthController;
