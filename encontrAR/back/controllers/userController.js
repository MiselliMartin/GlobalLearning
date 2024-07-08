import httpStatus from '../helpers/httpStatus.js'
import { encrypt, verified } from '../utils/bcrypt.js'
import { PrismaClient } from '@prisma/client'
import { generateToken } from '../utils/jwt.service.js'

const prisma = new PrismaClient()

export const userController = () => {

  const register = async(req, res, next) => {
    const newUser = req.body
    const hashPass = await encrypt(newUser.password)
    newUser.password = hashPass

    try {
      const createdUser = await prisma.user.create({data: newUser})
      
      const responseFormat = {
        data: createdUser,
        message: 'User created successfully'
      }

      //manejo de token en cookies
      const token = generateToken({id: createdUser.id, email: createdUser.email})
      res.cookie("token", token)

      return res.status(httpStatus.CREATED).json(responseFormat)
    }
    catch(error) {
      next(error)
    }
    finally {
    await prisma.$disconnect()
    }
  }

  const login = async (req, res, next) => {
    const {email, password} = req.body
    try {
      const user = await prisma.user.findUnique({where: {email}})
      if (!user) {
        res.clearCookie("token")
        return res.status(httpStatus.NOT_FOUND).json({message: 'User not found'})
      }
      const isMatch = await verified(password, user.password)
      if (!isMatch) {
        res.clearCookie("token")
        return res.status(httpStatus.UNAUTHORIZED).json({message: 'Invalid credentials'})
      }

      const token = generateToken({id: user.id, email: user.email})
      res.cookie("token", token)

      return res.status(httpStatus.OK).json({
        message: 'Login successful',
        token
      })
    } 
    catch (error) {
      next(error)
    } 
    finally {
      await prisma.$disconnect()
    }
  }

  const updateById = async(req, res, next) => {
    const id = req.tokenId
    
    const updateUser = req.body
    try {
      const user = await prisma.user.update({
        where: {id},
        data: updateUser
      })
      
      const responseFormat = {
        data: user,
        message: 'User updated successfully'
      }

      return res.status(200).json(responseFormat)
    }
    catch (err) {
      return next(err)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  const deleteById = async (req, res, next) => {
    const id = req.tokenId

    try {
      await prisma.user.delete({
        where: {id}
      })

      return res.status(200).json({message: 'User deleted successfully'})
    }
    catch (err) {
      return next(err)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  const getById = async (req, res, next) => {
    const id = req.tokenId
    console.log(id)

    try {
      const user = await prisma.user.findUnique({where: {id}})

      const responseFormat = {
        data: user,
        message: 'User retrieved successfully'
      }

      return res.status(200).json(responseFormat)
    }
    catch (err) {
      next(err)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  return {
    register,
    login,
    updateById,
    deleteById,
    getById
  }
}