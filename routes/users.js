const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/myDome', usersController.mydome);



module.exports = router;