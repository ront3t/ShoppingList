import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import session from "express-session" 
import MongoStore from 'connect-mongo'

const app = express()

app.use(morgan('dev'));

app.use(cors())

app.use(express.json());

export default app
