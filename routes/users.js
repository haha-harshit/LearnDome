const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');


// instructor's uploaded courses
router.get('/uploaded-courses', usersController.uploadedCourses);

// student's enrolled courses
router.get('/myDome', usersController.mydome);

// profile-view-student
router.get('/profile', usersController.profile);

// profile-view-instructor
router.get('/i-profile', usersController.i_profile);

module.exports = router;