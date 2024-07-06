import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { bodyUserSchema, updateUserSchema } from '../schemas/userSchemas.js'
import { encrypt, verified } from '../utils/bcrypt.js'

export const userRouter = Router()

