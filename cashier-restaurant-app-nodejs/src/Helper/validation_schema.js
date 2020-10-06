const Joi = require('joi')

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  image: Joi.string().required()
})

const historySchema = Joi.object({
  invoice: Joi.string().required(),
  cashier: Joi.string().required(),
  order: Joi.string().required(),
  total: Joi.number().required()
})

const categorySchema = Joi.object({
  name: Joi.string().required()
})

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  image: Joi.string()
})

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
})

module.exports = {
  productSchema, historySchema, categorySchema, userSchema, authSchema
}
