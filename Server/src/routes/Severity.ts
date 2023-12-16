import express from "express";
import * as severityController from "../controllers/Severity"

const router = express.Router();

router.get('/',severityController.getSeverity);

export default router