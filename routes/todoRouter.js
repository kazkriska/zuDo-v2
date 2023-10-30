const express = require('express');
const { create, readAll, readUnique, update, remove } = require('../controller/queries');

const router = express.Router();

//need to create more update routes

router.post('/todo/create', create);
router.get('/todo', readAll)
router.get('/todo/:id', readUnique)
router.put('/todo/:id', update)
router.delete('/todo/:id', remove)

module.exports = router;
