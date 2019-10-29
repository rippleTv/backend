const Movie = require("../model/movieModel");
// const movie = new Movie()


//Get all the movies
exports.getAllMovie = async (req, res) => {

  try{
  const movies = await Movie.find({})
      res.status(200).json({
        message: "Request successful",
        results:movies.length,
        data: { movies}
      });
    }
    catch{err => {
      res.status(404).res.json({
        message: "Not found",
        data: err,
      });
    }
}
}

//Get one movie
exports.getMovie = async (req, res) => {
 const _id = req.params._id;
 try {
   const movie = await Movie.findById(_id);
   //check if movie
   if (!movie) {
     return new Error("Movie not found ");
   }
   res.status(200).json({
     message: "Request successful",
     data: { movie }
   });
 } catch (error) {
   res.status(404).res.json({
     message: "Not found",
     data: error
   });
 }
};

//Post / Upload a movie
exports.uploadMovie = async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(201).json({
      message: "Movie was successfully uploaded!",
      status: "success",
      data: { movie}
    });
  } catch (err) {
    res.status(400).json({
      message: "Couldnt upload Movie",
      status: "Fail",
      Info: err
    });
  }
}
                                            
//patch /update a movie
exports.updateMovie = async (req, res) => {
  
     const _id = req.params.id;
  const { name, genre,category,releaseYear,isReleased } = req.body;

  try {
    const movie = Movie.findByIdAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      message: "Successfully updated movie!",
      data: movie
    });
  } catch (error) {
    res.status(404).json({
      message: error
    });
  }
}

 //Delete a movie
exports.deleteMovie = async (req, res) => {
 const _id = req.params.id;
  try {
    const movie = await Movie.findByIdAndDelete({ _id });
    if (!movie) {
      throw new Error("Cannot find Movie");
    }
    res.status(200);
  } catch (err) {
    res.status(500);
  }
}
