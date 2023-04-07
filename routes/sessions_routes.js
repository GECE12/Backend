const express = require('express');
let router = express.Router();
let SessionsController = require('../controllers/sessions');


router.route('/sessions').get(SessionsController.new).post(SessionsController.create);

module.exports = router;