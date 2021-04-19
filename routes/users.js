const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/myDome', usersController.mydome);
router.get('/profile', usersController.profile);
router.get('/i-profile', usersController.i_profile);

module.exports = router;