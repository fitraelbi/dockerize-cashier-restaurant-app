const { Category } = require('../Config/module/model')
const respon = require('../Helper/respon')
const { categorySchema } = require('../Helper/validation_schema')
const createError = require('http-errors')

const controller = {}

controller.getAll = async function (req, res) {
  try {
    const data = await Category.findAll()
    if (data.length === 0) { res.send(respon(res, 203, data)) } else res.send(respon(res, 200, data))
  } catch (error) {
    res.send(error.message)
  }
}

controller.add = async (req, res, next) => {
  try {
    const body = req.body
    const data = {
      name: body.name
    }

    const result = await categorySchema.validateAsync(data)
    const doesExist = await Category.findOne({ where: { name: result.name } })
    if (doesExist) throw await createError.Conflict(`${result.name} is already been there`)

    const name = result.name

    const update = await Category.create({ name: name })

    return res.send(respon(res, 201, update))
  } catch (error) {
    error.isJoi === true ? error.status = 422 : null
    next(error)
  }
}

controller.update = async (req, res, next) => {
  try {
    const body = req.body
    const result = await categorySchema.validateAsync(body)
    const doesExist = await Category.findOne({ where: { id: result.id } })
    if (!doesExist) throw await createError.Conflict('Not Found')

    const name = result.name

    const saved = await Category.update({ name: name }, { where: { id: body.id } })

    return res.send(respon(res, 200, saved))
  } catch (error) {
    error.isJoi === true ? error.status = 422 : null
    res.send(error)
  }
}

controller.delete = async function (req, res) {
  try {
    const result = req.body
    const name = req.body.name
    const doesExist = await Category.findOne({ where: { name: name } })
    if (!doesExist) throw await createError.Conflict(`${result.name} isn't there`)

    await Category.destroy({ where: { id: result.id } })
    res.send(respon(res, 200, 'Data was Deleted'))
  } catch (error) {
    res.send(error)
  }
}

module.exports = controller
