const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));

//Recipes route
router.use('/recipes', require('./recipes'));


module.exports = router;
