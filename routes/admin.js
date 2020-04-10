const express = require('express');
const router = express.Router();
const adminController = require('../app/api/controllers/admin');


router.post('/admin_register', adminController.create);
router.post('/admin_authenticate', adminController.authenticate);

module.exports = router;