import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { schemaValidator } from '../middlewares/validations.js'
import {userLoginSchema, userRegisterSchema, idUserSchema, updateUserSchema} from '../schemas/userSchemas.js'
const { register, login, deleteById, updateById, getById } = bookController()


export const userRouter = Router()

userRouter.post('/register', schemaValidator(userRegisterSchema), register)
userRouter.post('/login', schemaValidator(userLoginSchema), login)
userRouter.get('/user/:id', schemaValidator(idUserSchema), getById)
userRouter.delete('/user/:id', schemaValidator(idUserSchema), deleteById)
userRouter.patch('/user/:id', schemaValidator(updateUserSchema), updateById)



