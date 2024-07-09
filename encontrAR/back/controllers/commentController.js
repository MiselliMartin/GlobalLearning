import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const commentController = () => {
  
  const comment = async (req, res, next) => {
    const {text} = req.body
    const reportId = Number(req.params.reportId)
    const userId = req.tokenId

    try {
      const createdComment = await prisma.comment.create({
        data: {
          text,
          userId,
          reportId
        },
      });

      const responseFormat = 
      {
        data: createdComment,
        message: 'Comment created successfully'
      }

      return res.status(httpStatus.CREATED).json(responseFormat)
    }
    catch (error) {
      next(error)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  const deleteComment = async (req, res, next) => {
    const { id } = req.params
    const userId = req.tokenId

    try {
      const comment = await prisma.comment.delete({
        where: { id, userId }
      })

      if (!comment) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "You can't delete this" })
      }

      return res.status(httpStatus.NO_CONTENT).json({ message: 'Comment deleted successfully' })
    }
    catch(error) {
      next(error)
    }
    finally {
      await prisma.$disconnect()
    }
  }
  
  return {
    comment,
    deleteComment
  }
}