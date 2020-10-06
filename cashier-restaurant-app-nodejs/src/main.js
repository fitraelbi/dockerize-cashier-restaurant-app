const express = require('express')
const routes = express.Router()

const productRoute = require('./Routes/product')
const historyRoute = require('./Routes/history')
const categoryRoute = require('./Routes/category')
const userRoute = require('./Routes/user')
const authRoute = require('./Routes/auth')

routes.get('/', async (req, res, next) => {
  res.send('Hello')
})

routes.use('/product', productRoute)
routes.use('/history', historyRoute)
routes.use('/category', categoryRoute)
routes.use('/user', userRoute)
routes.use('/auth', authRoute)

module.exports = routes
