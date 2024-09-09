import { Router } from "express";
import { login, signUp } from "../controllers/auth";
import { errorHandler } from "../../error-handler";

const authRoutes:Router = Router();

authRoutes.post('/login',errorHandler(login));
authRoutes.post('/signup',errorHandler(signUp));

export default authRoutes;