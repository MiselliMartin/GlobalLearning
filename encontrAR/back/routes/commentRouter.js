import { Router } from 'express'
import { commentController } from '../controllers/commentController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyCommentSchema } from '../schemas/commentSchemas.js'
import { validateToken } from '../middlewares/validateToken.js'
const { comment, deleteComment } = commentController()

//por ahora no se pueden editar comentarios

export const commentRouter = Router()
commentRouter.post('/comment/:reportId', validateToken, schemaValidator(bodyCommentSchema), comment)
commentRouter.delete('/comment/:id', validateToken, deleteComment)