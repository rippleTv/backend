const router = require("express").Router();
const MovieController = require("../controller/movieController");
const authController = require("../controller/authController");

const authorize = [authController.auth, authController.authRoles];

module.exports = () => {
  router.get("/:id", authController.auth, MovieController.getMovie);
  router.get("/all", authController.auth, MovieController.getAllMovie);
  router.post("/upload", authorize, MovieController.uploadMovie);
  router.put("/:id", authorize, MovieController.updateMovie);
  router.delete("/:id", authorize, MovieController.deleteMovie);

  return router;
};
