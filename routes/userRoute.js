const router = require('express').Router();
const UserController = require('../controller/userController');

module.exports = () => {
	const userCtl = new UserController();
	router.post('/register', userCtl.registerUser);

	router.post('/login', userCtl.loginUser);

	router.get('/verify/:id', userCtl.verifyUser);

	return router;
};
