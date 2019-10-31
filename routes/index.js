const userRoute = require("./userRoute");
const movieRoute = require("./moviesRoute");
const router = require("express").Router();

module.exports = function(router) {
  router.use("/user", userRoute());

  router.use("/movie", movieRoute());

  return router;
};
