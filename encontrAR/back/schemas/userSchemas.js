import Joi from 'joi'

export const userLoginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
})

export const userRegisterSchema = Joi.object({
  body: Joi.object({
    username: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required()
  })
})

export const idUserSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'Debe ser un número').required()
  })
})

export const updateUserSchema = Joi.object({
  body: userRegisterSchema.extract('body'),
  params: idUserSchema.extract('params')
})