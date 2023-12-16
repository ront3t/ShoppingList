import { RequestHandler } from "express"
import SystemModel from "../models/System"

export const getStatuses:RequestHandler = async (req, res, next) => {
  try{
    const systems = await SystemModel.find().exec();
    res.status(200).json(systems)
  } catch(error)
  {
    next()
  }
}
