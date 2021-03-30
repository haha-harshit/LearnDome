const express = require('express');

const router = express.Router();

const passport = require('passport');

const mainController = require('../controllers/main_controller');
// const homeController = require('../controllers/home_controller');


// before log-in
router.get('/', mainController.main);

// for sign-up-form
router.get('/sign-up', mainController.sign_up);

// for log-in-form
router.get('/log-in', mainController.log_in);

// creating account- posting data(signing up)
router.post('/create-account', mainController.create_account);

// creating session(logging in)
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/log-in'}
), mainController.create_session); 


// for dashboard
router.use('/user', require('./users'));
router.use('/homepage', require('./home'));

module.exports = router;