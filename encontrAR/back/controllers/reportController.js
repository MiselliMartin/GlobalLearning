import httpStatus from '../helpers/httpStatus.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const reportController = () => {
  
  const createReport = async (req, res, next) => {
    const report = req.body
    const id = req.tokenId
    const reportWithUser = {
      ...report,
      userId: id
    }; 
    
    try {
      const createdReport = await prisma.report.create({
        data: {
          ...reportWithUser
        },
      });

      const responseFormat = 
      {
        data: createdReport,
        message: 'Report created successfully'
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

  const getReportById = async (req, res, next) => {
    const id = Number(req.params.id)

    try {
      const report = await prisma.report.findUnique({
        where: { id },
        include: {
          comments: {
            include: {
              user: true // Si también quieres incluir los detalles del usuario que hizo el comentario
            }
          },
          user: true // Si también quieres incluir los detalles del usuario que hizo el reporte
        }
      });

      if (!report) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Report not found' })
      }

      const responseFormat = {
        data: report,
        message: 'Report retrieved successfully'
      }

      return res.status(httpStatus.OK).json(responseFormat)
    }
    catch (error) {
      next(error)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  const getReportsByUser = async (req, res, next) => {
    const {tokenId} = req

    try {
      const reports = await prisma.report.findMany({where: {userId: tokenId}})

      if (!reports) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Reports not found' })
      }

      const responseFormat = {
        data: reports,
        message: 'Reports retrieved successfully'
      }

      return res.status(httpStatus.OK).json(responseFormat)
    }
    catch (error) {
      next(error)
    } 
    finally {
      await prisma.$disconnect()
    }
  }

  const updateReport = async(req, res, next) => {
    const id = Numnber(req.params.id)
    const reportToUpdate = req.body

    try {
      const report = await prisma.report.update({
        where: {id},
        data: reportToUpdate
      })

      if (!report) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Report not found' })
      }

      const responseFormat = {
        data: report,
        message: 'Report updated successfully'
      }

      return res.status(httpStatus.OK).json(responseFormat)
    }
    catch (error) {
      next(error)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  const deleteReport = async (req, res, next) => {
    const id = Number(req.params.id)

    try {
      const report = await prisma.report.delete({where: {id}})

      if (!report) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Report not found' })
      }

      return res.status(httpStatus.NO_CONTENT).json({ message: 'Report deleted successfully' })
    }
    catch (error) {
      next(error)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  const getAllReports = async (_req, res, next) => {
    try {
      const reports = await prisma.report.findMany({
        where: { status: 'OPEN' },
        include: {
          comments: {
            include: {
              user: true 
            }
          },
          user: true 
        }
      })

      if (!reports) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Reports not found' })
      }

      const responseFormat = 
      {
        data: reports,
        message: 'Reports retrieved successfully'
      }

      return res.status(httpStatus.OK).json(responseFormat)
    }
    catch(error) {
      next(error)
    }
    finally {
      await prisma.$disconnect()
    }
  }

  const getNearReports = async (req, res, next) => {
    const { lat, lng } = req.query;
    const degreeRange = 0.05;
  
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Faltan coordenadas' });
    }
  
    const latFloat = parseFloat(lat);
    const lngFloat = parseFloat(lng);
  
    const minLat = latFloat - degreeRange;
    const maxLat = latFloat + degreeRange;
    const minLng = lngFloat - degreeRange;
    const maxLng = lngFloat + degreeRange;
  
    try {
      const reports = await prisma.report.findMany({
        include: {
          comments: {
            include: {
              user: true
            }
          },
          user: true
        }
      });
  
      const nearReports = reports.filter(report => {
        const [reportLat, reportLng] = report.coordinates;
        return reportLat >= minLat && reportLat <= maxLat &&
               reportLng >= minLng && reportLng <= maxLng;
      });
  
      if (nearReports.length === 0) {
        return res.status(httpStatus.NOT_FOUND).json({ message: 'Reports not found' });
      }
  
      const responseFormat = {
        data: nearReports,
        message: 'Reports retrieved successfully'
      };
  
      return res.status(httpStatus.OK).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };
  
  
  return {
    createReport, 
    getReportById, 
    getReportsByUser, 
    updateReport, 
    deleteReport,
    getAllReports,
    getNearReports
  }
}