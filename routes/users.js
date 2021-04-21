const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');
const { route } = require('./course');


// instructor's uploaded courses
router.get('/uploaded-courses', usersController.uploadedCourses);

// student's enrolled courses
router.get('/myDome', usersController.mydome);

// profile-view-student-self
router.get('/s-profile', usersController.s_profile);

// profile-view-instructor-self
router.get('/i-profile', usersController.i_profile);

// student viewing instructor profile
router.get('/i-profile/:id', usersController.inst_profile);

module.exports = router;