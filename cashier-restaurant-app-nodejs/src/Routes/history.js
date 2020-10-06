const express = require('express')
const controller = require('../Controller/index')
const router = express.Router()

router.get('/', controller.history.getAll)
router.post('/', controller.history.add)
router.put('/', controller.history.update)
router.delete('/', controller.history.delete)

module.exports = router
