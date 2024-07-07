import { Router } from 'express'
import { commentController } from '../controllers/commentController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyCommentSchema, updateCommentSchema } from '../schemas/commentSchemas.js'

export const commentRouter = Router()