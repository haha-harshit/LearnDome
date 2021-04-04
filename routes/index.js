const express = require('express');

const router = express.Router();

const passport = require('passport');

const mainController = require('../controllers/main_controller');
// const homeController = require('../controllers/home_controller');


// before log-in
router.get('/', mainController.main);

// for sign-up-form
router.get('/sign-up-student', mainController.stu_sign_up);
router.get('/sign-up-instructor', mainController.inst_sign_up);
// for log-in-form
router.get('/log-in-student', mainController.log_in_student);
router.get('/log-in-instructor', mainController.log_in_instructor);

// creating account- posting data(signing up)
router.post('/create-stu-account', mainController.create_stu_account);
router.post('/create-inst-account', mainController.create_inst_account);

// creating session(logging in)
router.post('/create-session-student', passport.authenticate(
    'student-local',
    {failureRedirect: '/log-in-student'}
), mainController.create_session_student);
router.post('/create-session-instructor', passport.authenticate(
    'instructor-local',
    {failureRedirect: '/log-in-instructor'}
), mainController.create_session_instructor);


// destroying session(logging out)
router.get('/destroy-session', mainController.destroy_session);


// for dashboard
router.use('/user', require('./users'));
router.use('/homepage', require('./home'));

module.exports = router;