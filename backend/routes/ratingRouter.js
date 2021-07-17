const Router = require('express');
const router = new Router();
const authMiddleware = require('./../middleware/authMiddleware');
const checkAddRatingMiddleware = require('./../middleware/checkAddRatingMiddleware');
const ratingController = require('./../controllers/ratingController')

router
    .post('/', authMiddleware, checkAddRatingMiddleware, ratingController.addRating)
    .post('/check-rating', authMiddleware,  ratingController.checkRating);

module.exports = router;
