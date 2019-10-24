const router = require('express').Router();
const UserController = require('../controller/userController');
// const auth = require("../middleware/auth");

module.exports =() =>{
    const userCtl = new UserController();
    router.post('/register', userCtl.registerUser);

    // router.post('/login', userController.loginUser);

        return router
}
 







