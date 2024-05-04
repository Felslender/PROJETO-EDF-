const express = require('express');
const router = express.Router();

const controller = require('../controllers/controllerLogin');

router.post('/Login' ,controller.login,);


module.exports = router;

