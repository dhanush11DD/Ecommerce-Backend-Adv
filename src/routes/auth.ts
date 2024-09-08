import { Router } from "express";
import { login, signUp } from "../controllers/auth";

const authRoutes:Router = Router();

authRoutes.get('/login',login);
authRoutes.get('/signup',signUp);

export default authRoutes;