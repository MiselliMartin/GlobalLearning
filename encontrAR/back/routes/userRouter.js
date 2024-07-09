import { Router } from 'express'
import { userController } from '../controllers/userController.js'
import { schemaValidator } from '../middlewares/validations.js'
import { validateUserRegistration } from '../middlewares/validateUserRegistration.js'
import { validateToken } from '../middlewares/validateToken.js'
import { userLoginSchema, userRegisterSchema, updateUserSchema } from '../schemas/userSchemas.js'
const { register, login, deleteById, updateById, getById, logout } = userController()


export const userRouter = Router()

userRouter.post('/register', schemaValidator(userRegisterSchema), validateUserRegistration, register)
userRouter.post('/login', schemaValidator(userLoginSchema), login)
userRouter.post('/logout', logout)
userRouter.patch('/user', validateToken, schemaValidator(updateUserSchema), updateById)
userRouter.get('/user', validateToken, getById)
userRouter.delete('/user', validateToken, deleteById)