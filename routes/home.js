const express = require('express');
const passport = require('passport');

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', passport.checkAuthentication, homeController.home);
router.get('/myDome', homeController.mydome);


module.exports = router;