import Joi from 'joi'

export const bodyReportSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('OBJECT', 'PERSON', 'PET').required(),
    status: Joi.string().valid('OPEN', 'CLAIMED', 'RESOLVED').required(),
    coordinates: Joi.array().items(Joi.number()).min(2).required(),
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