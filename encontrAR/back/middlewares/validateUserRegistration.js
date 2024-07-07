import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const validateUserRegistration = async (req, res, next) => {

  const { username, email } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    next();
  } catch (err) {
    next(err);
  }
};