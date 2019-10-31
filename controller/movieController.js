const Movie = require("../model/movieModel");
// const movie = new Movie()


//Get all the movies
exports.getAllMovie = async (req, res,next) => {

  try{
  const movies = await Movie.find({})
      res.status(200).json({
        message: "Request successful",
        results:movies.length,
        data: { movies}
      });
    }
    catch{err => {
      next(err)
    }
}

}

//Get one movie
exports.getMovie = async (req, res) => {
 let _id;
 _id = req.params.id;
 console.log(req.para)
 try {
   const movie = await Movie.findById(_id);
   //check if movie
   if (!movie) {
      res.status(404).res.json({
        message: "Movie Not found",
        data: null,
        error: null
      });
   }
   res.status(200).json({
     message: "Request successful",
     data: { movie }
   });
 } catch (error) {
    next(error)
 }
};

//Post / Upload a movie
exports.uploadMovie = async (req, res) => {
  const movie = new Movie(req.body);
  // console.log(req.body);
  try {
    await movie.save();
    res.status(201).json({
      message: "Movie was successfully uploaded!",
      status: "success",
      data: { movie}
    });
  } catch (err) {
   next(err)
  }
}
                                            
//patch /update a movie
exports.updateMovie = async (req, res) => {
  
     const _id = req.params.id;
  let { name, genre,category,releaseYear,isReleased } = req.body;

  try {
    const movie =  await Movie.findByIdAndUpdate({ _id }, req.body, {
      new: true
     // runValidators: true
    });
    res.status(200).json({
      message: "Successfully updated movie!",
      data: {
        movie
      }
    });
  } catch (error) {
    next(error)
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
    res.status(204).json({
      message:"successfully deleted!"
    });
  } catch (err) {
    next(err)
  }
}
