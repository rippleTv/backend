const router = require("express").Router();
const MovieController = require("../controller/movieController");
const authController = require("../controller/authController")

const authorize = [authController.auth,authController.authRoles]

  router.get("/movie/:id",authController.auth, MovieController.getMovie);
  router.get("/allMovie", authController.auth, MovieController.getAllMovie);
  router.post("/uploadMovie", authorize, MovieController.uploadMovie);
  router.patch("/updateMovie/:id",authorize, MovieController.updateMovie);
  router.delete("/deleteMovie/:id", authorize, MovieController.deleteMovie);

module.exports = router

