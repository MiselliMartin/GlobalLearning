import Joi from 'joi'

export const bodyReportSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required().messages({
      'any.required': 'title es requerido',
      'string.empty': 'title no puede estar vacío'
    }),
    description: Joi.string().required().messages({
      'any.required': 'description es requerido',
      'string.empty': 'description no puede estar vacío'
    }),
    type: Joi.string().valid('OBJECT', 'PERSON', 'PET').required().messages({
      'any.required': 'type es requerido'}),
    coordinates: Joi.array().items(Joi.number()).min(2).required().messages({
      'any.required': 'coordinates es requerido'}),
  })
});

export const idReportSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().pattern(/^[0-9]+$/, 'Debe ser un número').required()
  })
}) 

export const updateReportSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().messages({
      'string.empty': 'title no puede estar vacío'
    }),
    description: Joi.string().messages({
      'string.empty': 'description no puede estar vacío'
    }),
    type: Joi.string().valid('OBJECT', 'PERSON', 'PET'),
    status: Joi.string().valid('OPEN', 'SOLVING', 'SOLVED'),
    coordinates: Joi.array().items(Joi.number()).min(2).messages({
      'number.valid': 'debe ser un número'
    }),
  }),
  params: idReportSchema.extract('params')
})