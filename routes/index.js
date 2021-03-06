const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main_controller');
// const homeController = require('../controllers/home_controller');


// before log-in
router.get('/', mainController.main);

// for sign-up
router.get('/sign-up', mainController.sign_up);

//for sign-in
router.get('/log-in', mainController.log_in);

// for
// router.get('/home', homeController.home);


module.exports = router;