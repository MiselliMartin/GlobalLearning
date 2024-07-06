import httpStatus from '../helpers/httpStatus.js'
import jwt from 'jsonwebtoken'
import { encrypt, verified } from '../utils/bcrypt.js'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: '1d'
  })

  return token
}

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

      return response.status(httpStatus.CREATED).json(responseFormat)
    }
    catch(err) {
      return next(err)
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
        return res.status(httpStatus.NOT_FOUND).json({message: 'User not found'})
      }
      const isMatch = await verified(password, user.password)
      if (!isMatch) {
        return res.status(httpStatus.UNAUTHORIZED).json({message: 'Invalid credentials'})
      }
      const token = generateToken({id: user.id, email: user.email})
      return response.status(httpStatus.OK).json({
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
    const {idParam} = req.params
    const id = Number(idParam)
    const updateUser = req.body
    try {
      const user = await prisma.user.update({
        where: {id},
        data: updateUser
      })
      
      const responseFormat = {
        data: book,
        message: 'Book updated successfully'
      }

      return response.status(200).json(responseFormat)
    }
    catch (err) {
      return next(err)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  const deleteById = async (req, res, next) => {
    const {idParam} = req.params
    const id = Number(idParam)

    try {
      await prisma.user.delete({
        where: {id}
      })

      return response.status(200).json({message: 'User deleted successfully'})
    }
    catch (err) {
      return next(err)
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
  }
}