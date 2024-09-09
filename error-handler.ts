import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./src/exceptions/root"
import { InternelException } from "./src/exceptions/internel-excption"

export const errorHandler = (method: Function) =>{
    return async (req:Request ,res:Response,next:NextFunction) => {
        try {
           await  method(req , res , next)
        } catch (error:any) {
            let exception : HttpException;
            if(error instanceof HttpException){
                    exception = error;
            }else{
                exception = new InternelException('Somthing went wrong !',error , ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception);
        }
    }
}