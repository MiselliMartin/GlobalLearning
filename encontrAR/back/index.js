import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { expressjwt as ejwt } from 'express-jwt'
import { reportRouter } from './routes/reportRouter.js'
import { commentRouter } from './routes/commentRouter.js'
import { userRouter } from './routes/userRouter.js'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3001

const app = express()
app.use(express.json())
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
}))


app.use(cookieParser());

const JWT_SECRET = process.env.SECRET_KEY || "default-secret";
app.use(ejwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
  getToken: function fromCookie(req) {
    if (req && req.cookies) {
      return req.cookies.token;
    }
    return null;
  }
}).unless({
  path: ['/api/login', '/api/register', '/api/allReports'],
}));

app.use('/api', userRouter, reportRouter, commentRouter)

//middleware después de los endpoints, por ende en el catch{next(err)} == el error pasa y entra a errorHandler
app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
