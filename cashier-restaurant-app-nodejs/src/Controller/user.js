const { User } = require('../Config/module/model')
const respon = require('../Helper/respon')
const { userSchema } = require('../Helper/validation_schema')
const createError = require('http-errors')
const bcr = require('bcrypt')

const controller = {}

controller.getAll = async function (req, res) {
  try {
    const data = await User.findAll()
    if (data.length === 0) { res.send(respon(res, 203, data)) } else res.send(respon(res, 200, data))
  } catch (error) {
    res.send(error.message)
  }
}

controller.add = async (req, res, next) => {
  try {
    const body = req.body
    const data = {
      username: body.username,
      email: body.email,
      password: body.password,
      image: body.image
    }

    const result = await userSchema.validateAsync(data)
    const doesExist = await User.findOne({ where: { username: result.username } })
    if (doesExist) throw await createError.Conflict(`${result.username} is already been there`)

    const salt = await bcr.genSalt(10)
    const hashPassword = await bcr.hash(result.password, salt)
    const password = hashPassword

    const update = await User.create({ username: result.username, email: result.email, password: password, image: result.image })

    return res.send(respon(res, 201, update))
    // return res.send(password)
  } catch (error) {
    error.isJoi === true ? error.status = 422 : null
    next(error)
  }
}

module.exports = controller
