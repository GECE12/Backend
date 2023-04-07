const express = require('express');
let action_controller = require('../controllers/action');
let router = express.Router();

router.route('/actions').get(action_controller.see).post(action_controller.create);

router.get('/actions/register', action_controller.register)

//Wildcard

router.get('/actions/:id/change', action_controller.change)

router.route('/actions/:id').get(action_controller.pick).put(action_controller.update).delete(action_controller.destroy);
module.exports = router;


