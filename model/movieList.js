const mongoose = require("mongoose");

const movieListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
    required: false
  }
});

const Movies = mongoose.model("MoviesList", movieListSchema);
module.exports = Movies;
