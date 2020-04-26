const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

    const controller = require('../controller/controller.js');

	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

	app.post('/api/auth/signin', controller.signin);

	app.get('/api/user/profile', [authJwt.verifyToken, authJwt.isUser], controller.userContent);

	app.get('/api/admin/profile', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

   /*------Movie Routes------*/

	app.post('/api/admin/AddMovie', [authJwt.verifyToken, authJwt.isAdmin], controller.AddMovie);

	app.get('/api/AllMovie', controller.GetAllMovie);

	app.get('/api/Movie/Id', controller.MovieById);

	app.put('/api/movie/Update', [authJwt.verifyToken, authJwt.isAdmin], controller.UpdateMovie);

	app.delete('/api/movie/Delete', [authJwt.verifyToken, authJwt.isAdmin], controller.DeleteMovie);

	 /*------Review Routes------*/

	app.post('/api/user/AddReview', [authJwt.verifyToken, authJwt.isUser], controller.AddReview);

	app.get('/api/AllReview', controller.GetAllReview);

	app.get('/api/Review/Id', controller.ReviewById);

	app.put('/api/Review/Update', [authJwt.verifyToken], controller.UpdateReview);

	app.delete('/api/Review/Delete', [authJwt.verifyToken, authJwt.isAdmin], controller.DeleteReview);

}
