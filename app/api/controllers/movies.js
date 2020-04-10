
const movieModel = require('../models/movies');

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		movieModel.findById(req.params.movieId, function(err, movieInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Movie found!!!", data:{movies: movieInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let moviesList = [];

		movieModel.find({}, function(err, movies){
			if (err){
				next(err);
			} else{
				for (let movie of movies) {
					moviesList.push({id: movie._id, Name: movie.Name, Release_Date: movie.Release_Date, Category: movie.Category, Description: movie.Description,Image: movie.Image, Video: movie.Video, Director: movie.Director, Stars: movie.Stars, Ratings: movie.Ratings});
				}
				res.json({status:"success", message: "Movies list found!!!", data:{movies: moviesList}});
			}

		});
	},

	updateById: function(req, res, next) {
		movieModel.findByIdAndUpdate(req.params.movieId,{Name:req.body.Name}, function(err, movieInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Movie updated successfully!!!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Movie deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		movieModel.create({ Name: req.body.Name, Release_Date: req.body.Release_Date, Category: req.body.Category, Description: req.body.Description,Image: req.body.Image, Video: req.body.Video, Director: req.body.Director, Stars: req.body.Stars, Ratings: req.body.Ratings }, function (err, result) {
				  if (err)
				  	next(err);
				  else
				  	res.json({status: "success", message: "Movie added successfully!!!", data: null});
				});
	},

}