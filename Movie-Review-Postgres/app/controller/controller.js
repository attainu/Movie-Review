const db = require('../config/db.config.js');
const User = db.user;
const Role = db.role;
const Movie = db.movie;
const Review = db.movie;

const secret= 'movie-review-secret-key';
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		Role.findAll({
		  where: {
			name: {
			  [Op.or]: req.body.roles.map(role => role.toUpperCase())
			}
		  }
		}).then(data => {
			user.addRoles(data).then(() => {
				//res.send("User registered successfully!");
				res.send(data);
				

            });
		}).catch(err => {
			res.status(500).send("Error -> " + err);
		});
	}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user.id }, secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ user, auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

exports.userContent = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "User Content Page",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access User Page",
			"error": err
		});
	})
}

exports.adminBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Admin Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Admin Board",
			"error": err
		});
	})
}



/*--------Movie Controller-----------*/

//Create Movie
exports.AddMovie = (req, res) => {  
	// Save to PostgreSQL database
	Movie.create(req.body).then(movie => {    
		// Send created customer to client
		res.json(movie);
	  }).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	  });
  };

// FETCH All Movies
exports.GetAllMovie = (req, res) => {
	Movie.findAll().then(movie => {
		// Send All Customers to Client
		res.json(movie);
	  }).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	  });
  };


// Find a Movie by Id
exports.MovieById = (req, res) => {  
	Movie.findById(req.params.id).then(movie => {
		res.json(movie);
	  }).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	  });
  };
   
  // Update a Movie
  exports.UpdateMovie = (req, res) => {
	const id = req.body.id;
	Movie.update( req.body, 
		{ where: {id: id} }).then(() => {
		  res.status(200).json( { mgs: "Updated Successfully -> Movie Id = " + id } );
		}).catch(err => {
		  console.log(err);
		  res.status(500).json({msg: "error", details: err});
		});
  };
   
  // Delete a Movie by Id
  exports.DeleteMovie = (req, res) => {
	const id = req.params.id;
	Movie.destroy({
		where: { id: id }
	  }).then(() => {
		res.status(200).json( { msg: 'Deleted Successfully -> Movie Id = ' + id } );
	  }).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	  });
  };


/*--------Review Controller-----------*/

//Create Movie
exports.AddReview = (req, res) => {  
	// Save to PostgreSQL database
	Review.create(req.body).then(review => {    
		// Send created customer to client
		res.json(review);
	  }).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	  });
  };

// FETCH All Reviews
exports.GetAllReview = (req, res) => {
	Review.findAll().then(review => {
		// Send All Customers to Client
		res.json(review);
	  }).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	  });
  };


// Find a Review by Id
exports.ReviewById = (req, res) => {  
	Review.findById(req.params.id).then(review => {
		res.json(review);
	  }).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	  });
  };
   
  // Update a Review
  exports.UpdateReview = (req, res) => {
	const id = req.body.id;
	Review.update( req.body, 
		{ where: {id: id} }).then(() => {
		  res.status(200).json( { mgs: "Updated Successfully -> Review Id = " + id } );
		}).catch(err => {
		  console.log(err);
		  res.status(500).json({msg: "error", details: err});
		});
  };
   
  // Delete a Review by Id
  exports.DeleteReview = (req, res) => {
	const id = req.params.id;
	Review.destroy({
		where: { id: id }
	  }).then(() => {
		res.status(200).json( { msg: 'Deleted Successfully -> Review Id = ' + id } );
	  }).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	  });
  };

