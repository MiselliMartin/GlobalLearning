import Joi from 'joi'

export const bodyCommentSchema = Joi.object({
  body:Joi.object({
    text: Joi.string().required()
  })
})

export const idCommentSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'Debe ser un número').required()
  })
})

export const updateCommentSchema = Joi.object({
  body: bodyCommentSchema.extract('body'),
  params: idCommentSchema.extract('params')
})