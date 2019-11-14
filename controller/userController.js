const { registerUser, loginUser, verifyUser } = require('../services/user');
const { jwtGeneration } = require('../util/token');
const { sendConfirmEmailMessage } = require('../services/mailer');

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
}

module.exports = AuthController;
