const { registerUser, loginUser } = require("../services/user");
const { jwtGeneration } = require("../util/token");

function AuthController() {
  this.registerUser = (req, res, next) => {
    registerUser(req.body)
      .then(result => {
        return res.status(result.status).send({
          data: null,
          message: result.message,
          error: null
        });
      })
      .catch(error => {
        next(error);
      });
  };

  this.loginUser = (req, res, next) => {
    loginUser(req.body)
      .then(result => {
        return res.status(result.status).send({
          data: {
            email: req.body.email,
            password: req.body.password,
            token
          },
          message: result.message,
          error: null
        });
      })
      .catch(error => {
        next(error);
      });
    let data = {};
    data.email = loginUser.email;
    data.password = loginUser.password;
    const token = jwtGeneration(data);
  };
}

module.exports = AuthController;
