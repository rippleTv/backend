const jwt = require("jsonwebtoken")

let decoded;

exports.auth = (req, res, next)=> {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }

  try {
     decoded = jwt.verify(token, "jwtPrivateKey");
    req.token = token;
    req.user = decoded.user;
    //console.log(decoded)
    //console.log(decoded["role"])
    console.log(decoded["user"])
      
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

;
exports.authRoles =  (req, res, next)=> {
  //const token = req.header("x-auth-token");
const role = {
  Admin: "admin",
  User: "user"
};

//   console.log(req.body.role);
// console.log(role["Admin"]);

  if (decoded.role !== role.Admin) {
    return res.status(401).json({
      message: " Sorry, Only Admins can access this feature"
    });
  }
  next();
};
