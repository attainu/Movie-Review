const adminModel = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	create: function(req, res, next) {

		adminModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
				  if (err)
				  	next(err);
				  else
				  	res.json({status: "success", message: "Admin added successfully!!!", data: null});

				});
	},

	authenticate: function(req, res, next) {
		adminModel.findOne({email:req.body.email}, function(err, adminInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, adminInfo.password)) {

						 const token = jwt.sign({id: adminInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });

						 res.json({status:"success", message: "user found!!!", data:{admin: adminInfo, token:token}});

						}else{

							res.json({status:"error", message: "Invalid email/password!!!", data:null});

						}
					}
				});
	},

}
