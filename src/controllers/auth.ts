import { NextFunction, Request,Response } from "express"
import { compareSync, hashSync } from "bcrypt";
import { prismaClient } from "..";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secrets";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation-error";
import { signUpSchema } from "../schema/users";


export const signUp = async (req:Request , res:Response ,next:NextFunction) =>{

                signUpSchema.parse(req.body);
                const {email,password,name} = req.body;
        
                let user =await prismaClient.user.findFirst({where:{email}});
                if(user){
                        // throw Error("User already exists! ");
                        next(new BadRequestException('User alredy exists !',ErrorCode.USER_ALREADY_EXISTS))
        
                }
                user = await prismaClient.user.create({
                        data:{
                                name,
                                email,
                                password:hashSync(password,10)
                        }
                })
                res.json(user);

}

export const login = async (req:Request,res:Response,next:NextFunction) =>{
        const {email,password} = req.body;

        let user = await prismaClient.user.findFirst({where:{email}});

        if(!user){
                // next(new BadRequestException("User NotFound !",ErrorCode.USER_NOT_FOUND));
                throw Error("user not found")
        }

        if(!compareSync(password,user.password)){
                throw Error("Incorrect username or password");
        }

        const token = jwt.sign(
                {userId : user.id},JWT_SECRET
        );
        res.json({user,token})
        
}