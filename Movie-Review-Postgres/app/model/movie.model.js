module.exports = (sequelize, Sequelize) => {
	const Movie = sequelize.define("movie", {
	  Name: {
		type: Sequelize.STRING
	  },
	  Release_Date: {
		type: Sequelize.STRING
	  },
	  Category: {
		type: Sequelize.STRING
	  },
	  Image: {
		type: Sequelize.STRING
	  },
	  Video: {
		type: Sequelize.STRING
	  },
	  Description: {
		type: Sequelize.STRING
	  },
	  Director: {
		type: Sequelize.STRING
	  },
	  Stars: {
		type: Sequelize.STRING
	  },
	  Ratings: {
		type: Sequelize.STRING
	  }

	});
  
	return Movie;
  };
  