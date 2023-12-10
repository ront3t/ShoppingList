import { RequestHandler } from "express"
import SeverityModel from "../models/Severity"

export const getSeverity:RequestHandler = async (req, res, next) => {
  try{
    const severity = await SeverityModel.find().exec();
    res.status(200).json(severity)
  } catch(error)
  {
    next()
  }
}
