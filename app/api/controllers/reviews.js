const reviewModel = require('../models/reviews.js');



module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		reviewModel.findById(req.params.reviewId, function(err, reviewInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Movie found!!!", data:{reviews: reviewInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let reviewList = [];

		reviewModel.find({}, function(err, reviews){
			if (err){
				next(err);
			} else{
				for (let review of reviews) {
					reviewList.push({id: review._id, Description: review.Description});
				}
				res.json({status:"success", message: "Movies list found!!!", data:{reviews: reviewList}});
			}

		});
	},

	updateById: function(req, res, next) {
		reviewModel.findByIdAndUpdate(req.params.reviewId,{Description:req.body.Description}, function(err, reviewInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Movie updated successfully!!!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		reviewModel.findByIdAndRemove(req.params.reviewId, function(err, reviewInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Review deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		reviewModel.create({ Description: req.body.Description }, function (err, result) {
				  if (err)
				  	next(err);
				  else
				  	res.json({status: "success", message: "Review added successfully!!!", data: null});
				});
	},

}