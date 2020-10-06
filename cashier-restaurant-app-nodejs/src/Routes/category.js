const express = require('express')
const controller = require('../Controller/index')
const router = express.Router()

router.get('/', controller.category.getAll)
router.post('/', controller.category.add)
router.put('/', controller.category.update)
router.delete('/', controller.category.delete)

module.exports = router
