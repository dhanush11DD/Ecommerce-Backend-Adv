import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";


export const createProduct = async (req:Request , res:Response) =>{

    const product = await prismaClient.product.create({
        data:{
            ...req.body,
            tags : req.body.tags.join(',')
        }
    })

    res.json(product)
}

export const updateProduct = async (req:Request , res:Response) =>{

    try {

        const product = req.body;
        if(product.tags){
            product.tags = product.tags.join(',');
        }
        const updatedProduct = await prismaClient.product.update({
            where:{id: +req.params.id},
            data : product
        })
        res.json(updatedProduct);

    } catch (error) {
        throw new NotFoundException("product not found",2001)
    }

}

export const deleteProduct = async (req:Request , res:Response) =>{

    try {
       prismaClient.product.delete({
            where: {
                id : +req.params.id
            }
        })
        res.send("product deleted successfully")
    } catch (error) {
        throw new NotFoundException("Product not found",2001)
    }

}

export const listProducts = async (req:Request , res:Response) =>{

    const  count = await prismaClient.product.count();
    const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : 0;
    const productList =await prismaClient.product.findMany({
        skip :skip,
        take : 5
    })

    res.json({count,productList})

}

export const getProductById = async (req:Request , res:Response) =>{

    try{

        const product = await prismaClient.product.findFirstOrThrow({
            where :{
                id : +req.params.id,
            }
        })

        res.json(product)

    }catch(error){
        throw new NotFoundException("Product not found",2001)
    }

}