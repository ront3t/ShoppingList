import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from "body-parser"
import dotenv from "dotenv"
import morgan from 'morgan'
import createHttpError, {isHttpError} from 'http-errors'
import cors from 'cors'
import StatusRoutes from "./routes/Status"
import SeverityRoutes from "./routes/Severity"
import UserRoutes from "./routes/User"
import session from 'express-session'
import MongoStore from 'connect-mongo'

///configurations
const app = express()
app.use(express.json())
dotenv.config()
app.use(bodyParser.json({limit:"30mb"}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(session({
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_STRING
    }),
}));
app.use(morgan('dev'));
app.use(cors())

///middlewares
app.use('/api/status', StatusRoutes)
app.use('/api/severity', SeverityRoutes)
app.use('/api/user', UserRoutes)

app.use( (req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

app.use((error:unknown,req:Request, res:Response,next:NextFunction) => {
  let errorMessage = "fuck my life";
  let statusCode = 500;
  if (isHttpError(error))
  {
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({ error:errorMessage})
})

export default app
