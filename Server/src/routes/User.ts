import express from "express";
import * as UserController from "../controllers/User";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.post("/signUp", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;