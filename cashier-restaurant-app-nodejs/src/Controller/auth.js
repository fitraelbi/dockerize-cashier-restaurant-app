const { User } = require('../Config/module/model')
const createError = require('http-errors')
const bcr = require('bcrypt')
const { authSchema } = require('../Helper/validation_schema')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../Helper/jwt_helpers')

const controller = {}

controller.login = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await authSchema.validateAsync(req.body)
    const user = await User.findOne({ where: { email: result.email } })
    if (!user) throw await createError.NotFound('email is not registered')

    const isMatch = await bcr.compare(result.password, user.password)
    if (!isMatch) throw createError.Unauthorized('username/password not valid')

    const accessToken = await signAccessToken(user.username, user.role)
    const refreshToken = await signRefreshToken(user.username, user.role)

    res.send({ accessToken, refreshToken })
  } catch (error) {
    error.isJoi === true ? error.status = 422 : null
    next(error)
  }
}

controller.refresh_token = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) throw createError.BadRequest()
    const userId = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(userId)

    res.send({ accessToken })
  } catch (error) {
    next(error)
  }
}

module.exports = controller
