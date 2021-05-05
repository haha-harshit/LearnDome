const express = require('express');
const passport = require('passport');

const router = express.Router(); 
 

const reviewController = require('../controllers/review_controller');

router.post('/create-review', passport.checkAuthentication, reviewController.create_review);


router.post('/delete-review', passport.checkAuthentication, reviewController.delete_review);

module.exports = router;