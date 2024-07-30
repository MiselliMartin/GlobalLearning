import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import { expressjwt as ejwt } from 'express-jwt'
import { reportRouter } from './routes/reportRouter.js'
import { commentRouter } from './routes/commentRouter.js'
import { userRouter } from './routes/userRouter.js'
import errorHandler from './middlewares/errorHandler.js'

//Variables .env
dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT || 3001

// donde se levanta el front
const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://127.0.0.1:5173', 
  credentials: true,
  methods: 'GET, POST, PATCH, DELETE',
}))

//porque manejo el token en las cookies
app.use(cookieParser());


//para indicarle que el token está en las cookies
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
  path: ['/api/login', '/api/register', '/api/allReports', '/api/verify', '/api/nearReports'],
}));

app.use('/api', userRouter, reportRouter, commentRouter)

//middleware después de los endpoints, por ende en el catch{next(err)} == el error pasa y entra a errorHandler
app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
