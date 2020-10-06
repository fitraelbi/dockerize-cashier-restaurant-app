const redis = require('redis')
const respon = require('./respon')

const REDIS_PORT = process.env.PORT_REDIS || 6379

const client = redis.createClient(REDIS_PORT)

const cache = {}

cache.menu = async (req, res, next) => {
  client.get('getAll', (err, data) => {
    data2 = JSON.parse(data)
    if (data !== null) {
      res.send(respon(res, 200, JSON.parse(data))).status("ok")
    } else {
      next()
    }
  })
}

cache.orderName = async (req, res, next) => {
client.get('getAllName', (err, data) => {
    if (err) throw err
    if (data !== null) {
      res.send(respon(res, 200, JSON.parse(data)))
    } else {
      next()
    }
  })
}

cache.orderPriceHigh = async (req, res, next) => {
  client.get('getAllpricehigh', (err, data) => {
    if (err) throw err
    if (data !== null) {
      res.send(respon(res, 200, JSON.parse(data)))
    } else {
      next()
    }
  })
}

cache.orderCategory = async (req, res, next) => {
  client.get('getAllcategory', (err, data) => {
    if (err) throw err
    if (data !== null) {
      res.send(respon(res, 200, JSON.parse(data)))
    } else {
      next()
    }
  })
}

cache.orderNew = async (req, res, next) => {
  client.get('getAllnew', (err, data) => {
    if (err) throw err
    if (data !== null) {
      res.send(respon(res, 200, JSON.parse(data)))
    } else {
      next()
    }
  })
}

cache.orderPriceLow = async (req, res, next) => {
  client.get('getAllpricelow', (err, data) => {
    if (err) throw err
    if (data !== null) {
      res.send(respon(res, 200, JSON.parse(data)))
    } else {
      next()
    }
  })
}

cache.orderHistory = async (req, res, next) => {
    client.get('getAllhistory', (err, data) => {
      if (err) throw err
      if (data !== null) {
        res.send(respon(res, 200, JSON.parse(data)))
      } else {
        next()
      }
    })
  }

module.exports = { cache, client }
