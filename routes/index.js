const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main_controller');
// const homeController = require('../controllers/home_controller');


// before log-in
router.get('/', mainController.main);

// for sign-up-form
router.get('/sign-up', mainController.sign_up);

//for log-in-form
router.get('/log-in', mainController.log_in);

// for account creation(sign-up)
router.post('/create-account', mainController.create_account);

// for session creation(log-in)
router.post('/create-session', mainController.create_session);


// for dashboard
router.use('/user', require('./users'));
router.use('/homepage', require('./home'));

module.exports = router;