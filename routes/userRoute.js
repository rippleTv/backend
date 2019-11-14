const router = require('express').Router();
const UserController = require('../controller/userController');

const { authenticate } = require('../middleware/auth');

module.exports = () => {
	const userCtl = new UserController();
	router.post('/register', userCtl.registerUser);

	router.post('/login', userCtl.loginUser);

	router.get('/verify/:id', userCtl.verifyUser);

	router.get('/account', authenticate, userCtl.getUserData);

	router.post('/reset-password', userCtl.sendResetPassordMail);

	router.post(
		'/reset-password/:token',
		authenticate,
		userCtl.resetUserPassword
	);

	return router;
};
