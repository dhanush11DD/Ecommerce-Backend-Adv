import express ,{Express,Request,Response}  from "express";
import { PORT } from './../secrets';
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middleware/errors";
import { signUpSchema } from "./schema/users";

const app:Express = express();
app.use(express.json());

app.use('/',rootRouter)

export const prismaClient = new PrismaClient({
    log : ['query'],
}).$extends({
    query : {
        user : {
            create({args ,query}){
                args.data = signUpSchema.parse(args.data)
                return query(args)
            }
        }
    }
})

app.use(errorMiddleware)

app.listen(PORT,()=>console.log("port is running in 3000"));