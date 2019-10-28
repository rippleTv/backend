const User = require("../model/user");
const bcrypt = require("bcryptjs");

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
        return { status: 400, message: "Email already exist" };
      }

      const newUser = new User({
        name: Body.name,
        email: Body.email,
        password: Body.password
      });

      newUser.save();
      return { status: 200, message: "User successfully added" };
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
          message: "Auth Failed. Email or password is incorrect"
        };
      }
      return user.comparePassword(Body.password).then(match => {
        if (!match) {
          return {
            status: 401,
            message: "Auth Failed. Email or password is incorrect"
          };
        }
        return { status: 200, message: "Successfully logged in" };
      });
    })
    .catch(error => {
      throw error;
    });
};
module.exports = { registerUser, loginUser };
