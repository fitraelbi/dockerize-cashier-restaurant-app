const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const createError = require('http-errors')

const db = require('./src/Config/db/db')
const routes = require('./src/main')

const app = express()
const port = process.env.PORT

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(routes)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

db
  .authenticate()
  .then(() => {
    console.log('database connected')
  })
  .catch(err => {
    console.log(err)
  })

app.listen(port, () => {
  console.log(`Server has running on port ${port}`)
})
