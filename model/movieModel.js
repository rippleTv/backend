const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  name: {
    type: String,
    //lowercase: true,
    required: [true, "The name of the movie is required"]
  },

  genre: {
    type: String,
    lowercase: true,
    required: [true, "The movie genre is required"]
  },

  category: {
    type: String,
    required: [true, "The movie category is required"]
  },
  isReleased: {
    type: Boolean,
    default: false
  },
  releaseYear: {
    type: Date,
    required: [true, "The release year of the movie is required"]
  },

  // role: {
  //   type: String,
  //   enum: ["user", "admin"],
  //   lowercase: true,
  //   default: "user"
  // }
  //{ timestamps: true }
});
const Movies = mongoose.model("Movies", moviesSchema);
module.exports = Movies;
