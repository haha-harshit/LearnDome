const express = require('express');
const passport = require('passport');

const router = express.Router();
 

const courseController = require('../controllers/course_controller');

// for creating course(uploading)
router.post('/create-course',passport.checkAuthentication ,courseController.create_course);

// exploring a course---open a mini course modal
router.get('/course-modal/:id', courseController.course_modal);

// 
router.post('/enroll-course', courseController.course_enroll);

module.exports = router;