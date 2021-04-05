const express = require('express');
const passport = require('passport');

const router = express.Router();


const courseController = require('../controllers/course_controller');


router.post('/create-course', courseController.create_course);

module.exports = router;