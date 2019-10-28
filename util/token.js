const jwt = require("jsonwebtoken");
const config = require("../config/custom-environment -variable.json");

//JWT generation
exports.jwtGeneration = user => {
  const token = jwt.sign(user, "jwtPrivateKey", {
    expiresIn: "30d"
  });
  return token;
};
