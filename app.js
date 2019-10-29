const express = require("express");
const logger = require("morgan");
const Router = express.Router();
const movieRoutes = require("./routes/movieRoutes")

const appRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));

app.use("/api", appRoutes(Router));
app.use("/api/movie",movieRoutes)

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).send({
    message: error.message || "Internal Server Error",
    data: null,
    error: error
  });
});

module.exports = app;
