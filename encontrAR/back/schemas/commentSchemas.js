import Joi from 'joi'

export const bodyCommentSchema = Joi.object({
  body:Joi.object({
    reportId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
    text: Joi.string().required()
  })
})

export const idCommentSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'Debe ser un número').required()
  })
})