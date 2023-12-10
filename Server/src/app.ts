import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from "body-parser"
import dotenv from "dotenv"
import morgan from 'morgan'
import createHttpError, {isHttpError} from 'http-errors'
import cors from 'cors'
import mongoose from 'mongoose'
import StatusRoutes from "./routes/Status"

///configurations
dotenv.config()
const app = express()
app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.json({limit:"30mb"}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cors())

///middlewares
app.use('/api/status', StatusRoutes)

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

mongoose.connect(process.env.MONGO_CONNECTION_STRING!).then(() => {
  console.log('mongoose connected')
  app.listen(process.env.PORT, () => {
    console.log('server running on port: ' + process.env.PORT)
  })
}).catch(console.error)

export default app
