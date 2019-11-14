const router = require("express").Router();

const userRoute = require("./userRoute");
const subscriptionRoute = require("./subscription");
const movieRoute = require("./moviesRoute");
const movieList = require("./movieList");
module.exports = function(router) {
  router.use("/user", userRoute());
  router.use("/subscription", subscriptionRoute());
  router.use("/movies", movieRoute());
  router.use("/movielist", movieList());

  return router;
};
