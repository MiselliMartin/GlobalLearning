import { Router } from 'express'
import { schemaValidator } from '../middlewares/validations.js'
import { validateToken } from '../middlewares/validateToken.js'
import { reportController } from '../controllers/reportController.js'
import { bodyReportSchema, updateReportSchema } from '../schemas/reportSchemas.js'
const { createReport, getReportById, getReportsByUser, updateReport, deleteReport, getAllReports } = reportController()

export const reportRouter = Router()

reportRouter.post('/report', validateToken, schemaValidator(bodyReportSchema), createReport)
reportRouter.get('/report', validateToken, getReportsByUser)
reportRouter.get('/report/:id',validateToken, getReportById)
reportRouter.patch('/report/:id', validateToken, schemaValidator(updateReportSchema), updateReport)
reportRouter.delete('/report/:id', validateToken, deleteReport)
reportRouter.get('/allReports', getAllReports)