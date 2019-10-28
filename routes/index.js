const userRoute = require("./userRoute");
const router = require("express").Router();

module.exports = function(router) {
  router.use("/user", userRoute());
  return router;
};
