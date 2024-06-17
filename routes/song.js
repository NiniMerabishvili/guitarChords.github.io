const express = require('express');
const router = express.Router();

const songService = require('../services/songService');

router.post('/add', songService.add);

module.exports = router;