const express = require('express');
const router = express.Router();
const reviewController = require('../app/api/controllers/reviews');

router.get('/', reviewController.getAll);
router.post('/', reviewController.create);
router.get('/:reviewId', reviewController.getById);
router.put('/:reviewId', reviewController.updateById);
router.delete('/:reviewId', reviewController.deleteById);

module.exports = router;