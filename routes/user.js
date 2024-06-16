const express = require('express');
const router = express.Router();

const userService = require('../services/userService');

router.get('/all', userService.getAll);
router.post('/add', userService.add);
router.get('/:id', userService.getOne);

module.exports = router;