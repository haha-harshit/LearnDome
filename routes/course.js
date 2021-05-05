const express = require('express');
const passport = require('passport');

const router = express.Router(); 
 

const courseController = require('../controllers/course_controller');

//FOR INSTRUCTOR
// --> for creating course(uploading)
router.post('/create-course',passport.checkAuthentication ,courseController.create_course);

router.get('/delete-course/:id', passport.checkAuthentication, courseController.delete_course);

// --> for viewing course modal 
router.get('/inst-course-modal/:id', courseController.inst_course_modal);

// exploring a course---open a mini course modal
router.get('/student-course-modal/:id', courseController.course_modal);

// student-enrollment
router.post('/enroll-course', courseController.course_enroll);

module.exports = router;