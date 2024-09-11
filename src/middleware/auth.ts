import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { JWT_SECRET } from "../../secrets";
import { prismaClient } from "..";

const authMiddleware = async (req:Request,res:Response,next:NextFunction) =>{

    try {
        const token = req.headers.authorization;

        if(!token){
            next(new UnauthorizedException('Unauthorized ' , ErrorCode.UNAUTHORIZED));
        }
    
        const payload = jwt.verify(token!,JWT_SECRET) as any;
    
        const user = prismaClient.user.findFirst({where:{id:payload.userId}})
    
        if(!user){
            next(new UnauthorizedException('Unauthorized ' , ErrorCode.UNAUTHORIZED));
        }
        next()

    } catch (error) {
        next(new UnauthorizedException('Unauthorized ' , ErrorCode.UNAUTHORIZED));
    }

}

export default authMiddleware;