    const express = require('express');
    const router = express.Router();

    const songService = require('../services/songService');

    router.post('/add', songService.add);
    router.get('/all', songService.getAll);
    router.get('/all2', songService.getAll2);
    router.get('/title', songService.getTitles);
    router.get('/:id', songService.getOne);
    router.put('/:id/update', songService.updateStatus)
    router.delete('/:id/delete', songService.deleteSong);
    

    module.exports = router;