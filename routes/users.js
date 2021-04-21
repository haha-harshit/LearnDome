const express = require('express');
const passport = require('passport');
const { pass } = require('../../codeial/config/mongoose');

const router = express.Router();

const usersController = require('../controllers/users_controller');
const { route } = require('./course');


// instructor's uploaded courses
router.get('/uploaded-courses',passport.checkAuthentication ,usersController.uploadedCourses);

// student's enrolled courses
router.get('/myDome',passport.checkAuthentication ,usersController.mydome);

// profile-view-student-self
router.get('/s-profile',passport.checkAuthentication ,usersController.s_profile);

// profile-view-instructor-self
router.get('/i-profile',passport.checkAuthentication ,usersController.i_profile);

// student viewing instructor profile
router.get('/v-profile/:id',passport.checkAuthentication ,usersController.inst_profile);

// get profile update profile form(student)
router.get('/stu-update-profile', passport.checkAuthentication, usersController.stu_update_profile);

// get profile update form(instructor)
router.get('/inst-update-profile', passport.checkAuthentication, usersController.inst_update_profile);

// post update(student)
router.post('/stu-update-profile-ok/:id', passport.checkAuthentication, usersController.stu_update_profile_ok);

// post update(instructor)
router.post('/inst-update-profile-ok/:id', passport.checkAuthentication, usersController.inst_update_profile_ok);

module.exports = router;