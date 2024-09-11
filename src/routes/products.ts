import { Router } from "express";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../controllers/products";
import { errorHandler } from "../../error-handler";
import authMiddleware from "../middleware/auth";

const productRoutes:Router = Router();

productRoutes.post('/',[authMiddleware],errorHandler(createProduct))
productRoutes.put('/:id',[authMiddleware],errorHandler(updateProduct))
productRoutes.delete('/:id',[authMiddleware],errorHandler(deleteProduct))
productRoutes.get('/',[authMiddleware],errorHandler(listProducts))
productRoutes.get('/:id',[authMiddleware],errorHandler(getProductById))


export default productRoutes;