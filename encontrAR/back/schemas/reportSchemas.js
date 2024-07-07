import Joi from 'joi'

export const bodyReportSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'title es requerido',
      'string.empty': 'title no puede estar vacío'
    }),
    description: Joi.string().required().messages({
      'any.required': 'title es requerido',
      'string.empty': 'title no puede estar vacío'
    }),
    type: Joi.string().valid('OBJECT', 'PERSON', 'PET').required().messages({
      'any.required': 'type es requerido'}),
    status: Joi.string().valid('OPEN', 'CLAIMED', 'RESOLVED').required().messages({
      'any.required': 'status es requerido'}),
    coordinates: Joi.array().items(Joi.number()).min(2).required().messages({
      'any.required': 'coordinates es requerido'}),
    userId: Joi.number().integer().required()
  })
});

export const idReportSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'Debe ser un número').required()
  })
}) 

export const updateReportSchema = Joi.object({
  body: bodyReportSchema.extract('body'),
  params: idReportSchema.extract('params')
})