import { Request,Response ,NextFunction } from "express";
import ModelOrder from "../models/orders";

const order =new  ModelOrder();

export default class orderController {
    async create(req:Request,res:Response,next:NextFunction){
        try{
            const reuslt =await order.createOder(req.body);
            res.json({
                status:"success",
                data:{...reuslt},
                "message":"order created success !"
            })
        }catch(err){
            next(err);
        }
    }
    async getCurrentOreder(req:Request,res:Response,next:NextFunction){
        try{
            const reuslt =await order.currentOrder(req.params.id);
            res.json({
                status:"success",
                data:{...reuslt},
                "message":"current oreder"
            })
        }catch(err){
            next(err)
        }
    }
}