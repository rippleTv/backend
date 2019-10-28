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
          console.log(result);
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
}

module.exports = AuthController;
