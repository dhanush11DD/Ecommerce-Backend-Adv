import { Router } from "express";
import { login, signUp, user } from "../controllers/auth";
import { errorHandler } from "../../error-handler";
import authMiddleware from "../middleware/auth";

const authRoutes:Router = Router();

authRoutes.post('/login',errorHandler(login));
authRoutes.post('/signup',errorHandler(signUp));
authRoutes.get('/user',[authMiddleware],errorHandler(user));

export default authRoutes;