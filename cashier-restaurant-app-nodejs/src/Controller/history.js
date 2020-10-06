const sequelize = require('sequelize')
const { History } = require('../Config/module/model')
const respon = require('../Helper/respon')
const { historySchema } = require('../Helper/validation_schema')
const createError = require('http-errors')
const { client } = require('../Helper/redis')

const controller = {}

controller.getAll = async function (req, res) {
  try {
    const data = await History.findAll()
    if (data.length === 0) { res.send(respon(res, 203, data)) } else {
      client.setex('getAllhistory', 3600, JSON.stringify(data))
      res.send(respon(res, 200, data))
    }
  } catch (error) {
    res.send(error.message)
  }
}

controller.add = async (req, res, next) => {
  try {
    const body = req.body
    const data = {
      invoice: body.invoice,
      cashier: body.cashier,
      order: body.order,
      total: body.total
    }

    const result = await historySchema.validateAsync(data)
    const doesExist = await History.findOne({ where: { invoice: result.invoice } })
    if (doesExist) throw await createError.Conflict(`${result.invoice} is already been there`)

    const invoice = result.invoice
    const cashier = result.cashier
    const order = result.order
    const total = result.total

    const update = await History.create({ invoice: invoice, cashier: cashier, date: sequelize.literal('CURRENT_TIMESTAMP'), order: order, total: total })

console.log(update)

    client.del('getAllhistory')
    return res.send(respon(res, 200, update))
  } catch (error) {
    error.isJoi === true ? error.status = 422 : null
    next(error)
  }
}

controller.update = async (req, res, next) => {
  try {
    const body = req.body
    const result = await historySchema.validateAsync(body)
    const doesExist = await History.findOne({ where: { invoice: result.invoice } })
    if (!doesExist) throw await createError.Conflict('Not Found')

    const invoice = result.invoice
    const cashier = result.cashier
    const order = result.order
    const total = result.total

    const saved = await History.update({ cashier: cashier, orders: order, total: total }, { where: { invoice: invoice } })
    
    client.del('getAllhistory')
    return res.send(respon(res, 200, saved))
  } catch (error) {
    error.isJoi === true ? error.status = 422 : null
    res.send(error)
  }
}

controller.delete = async function (req, res) {
  try {
    const result = req.body
    const invoice = req.body.invoice
    const doesExist = await History.findOne({ where: { invoice: invoice } })
    if (!doesExist) throw await createError.Conflict(`${result.invoice} isn't there`)

    await History.destroy({ where: { invoice: invoice } })

    client.del('getAllhistory')
    res.send(respon(res, 200, 'Data was Deleted'))
  } catch (error) {
    res.send(error)
  }
}

module.exports = controller
