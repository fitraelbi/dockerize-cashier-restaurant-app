const express = require('express')
const controller = require('../Controller/index')

const router = express.Router()

router.get('/', controller.user.getAll)
router.post('/register', controller.user.add)

module.exports = router
