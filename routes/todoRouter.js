const express = require('express');
const { create, readAll, readUnique, update, remove, updateTest } = require('../controller/queries');

const router = express.Router();

//need to create more update routes

router.post('/todo/create', create);
router.get('/todo', readAll)
router.get('/todo/:id', readUnique)
router.put('/todo/:id', update)
// router.put('/todo/:id', updateTest)
router.delete('/todo/:id', remove)

module.exports = router;
