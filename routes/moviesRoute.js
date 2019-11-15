const router = require("express").Router();
const MovieController = require("../controller/movieController");
const { authenticate, authorize } = require("../middleware/auth");
const { validateMovie } = require("../middleware/validation");

const auth = [authenticate, authorize];

module.exports = () => {
  router.get("/:id", authenticate, MovieController.getMovie);
  router.get("/", authenticate, MovieController.getAllMovie);
  router.use(auth);
  router.post("/upload", validateMovie, MovieController.uploadMovie);
  router.put("/:id", MovieController.updateMovie);
  router.delete("/:id", MovieController.deleteMovie);

  return router;
};
