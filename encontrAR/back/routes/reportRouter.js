import { Router } from 'express'
import { schemaValidator } from '../middlewares/validations.js'
import { validateToken } from '../middlewares/validateToken.js'
import { reportController } from '../controllers/reportController.js'
import { bodyReportSchema, updateReportSchema } from '../schemas/reportSchemas.js'
const { createReport, getReportById, getReportsByUser, updateReport, deleteReport, getAllReports, getNearReports } = reportController()

export const reportRouter = Router()

//getAllReports y getNearReports pueden ser accedidas sin estar logueado 

reportRouter.post('/report', validateToken, schemaValidator(bodyReportSchema), createReport)
reportRouter.get('/report', validateToken, getReportsByUser)
reportRouter.get('/report/:id', validateToken, getReportById)
reportRouter.patch('/report/:id', validateToken, schemaValidator(updateReportSchema), updateReport)
reportRouter.delete('/report/:id', validateToken, deleteReport)
reportRouter.get('/allReports', getAllReports)
reportRouter.get('/nearReports', getNearReports)