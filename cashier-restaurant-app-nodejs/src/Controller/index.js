const product = require('./product')
const history = require('./history')
const category = require('./category')
const user = require('./user')
const auth = require('./auth')

const controller = {}

controller.product = product
controller.history = history
controller.category = category
controller.user = user
controller.auth = auth

module.exports = controller
