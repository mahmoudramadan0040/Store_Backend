import { Request,Response ,NextFunction } from "express";
import ModelProduct from "../models/products";

const product = new ModelProduct();

class ProductController{
    async create(req:Request,res:Response,next:NextFunction){
        try{
            const reuslt = await product.createProduct(req.body);
            res.json({
                status:"success",
                data:{...reuslt},

            })
        }catch(err){
            next(err);
        }
    }
    async index(req:Request,res:Response,next:NextFunction){
        try{
            const result = await product.getMany_prod();
            res.json({
                status:"success",
                data:result,
                "message": "all product "
            });
        }catch(err){
            next(err)
        }
    }
    async show(req:Request,res:Response,next:NextFunction){
        try{
            const reuslt = await product.getOne_prod(req.params.id as string );
            res.json({
                status:"success",
                data:{...reuslt},
                "message":"one product"
            })
        }catch(err){
            next(err);
        }
    }
    async delete(req:Request,res:Response,next:NextFunction){
        try{
            const reuslt = await product.deleteProduct(req.params.id as string );
            res.json({
                status:"success",
                data:{...reuslt},
                "message":"delete  product"
            })
        }catch(err){
            next(err);
        }
    }
}
export default ProductController;