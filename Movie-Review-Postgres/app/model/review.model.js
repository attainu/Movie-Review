module.exports = (sequelize, Sequelize) => {
	const Review = sequelize.define("review", {
	  Description: {
		type: Sequelize.STRING
	  }
	});
  
	return Review;
  };
  