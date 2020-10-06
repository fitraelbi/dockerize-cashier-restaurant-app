const express = require('express')
const controller = require('../Controller/index')

const router = express.Router()

router.post('/login', controller.auth.login)

router.post('/refresh-token', controller.auth.refresh_token)

// router.delete('/logout',  controller.auth.logout)

module.exports = router
