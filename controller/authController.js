const jwt = require("jsonwebtoken");
const config = require("../config/index");
const role = {
    Admin:"admin",
    User:"user"
}

exports.auth = (req, res, next)=> {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_KEY);
    //req.token = token;
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

;
exports.authRoles =  (req, res, next)=> {
  const token = req.header("x-auth-token");
//   console.log(req.body.role);
//   console.log(role["Admin"]);

  if (req.body.role !== role["Admin"]) {
    return res
      .status(401)
      .json({
        message:
          " Sorry, Only Admins can access this feature"
      });
  }
  next();
};
