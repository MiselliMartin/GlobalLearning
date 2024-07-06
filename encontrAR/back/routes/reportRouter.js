import { Router } from 'express'
import { reportController } from '../controllers/reportController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyReportSchema, updateReportSchema } from '../schemas/reportSchemas.js'