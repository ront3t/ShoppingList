import { RequestHandler } from "express"
import StatusModel from "../models/Status"

export const getStatuses:RequestHandler = async (req, res, next) => {
  try{
    const statuses = await StatusModel.find().exec();
    res.status(200).json(statuses)
  } catch(error)
  {
    next()
  }
}
