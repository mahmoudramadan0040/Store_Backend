import { Request,Response,NextFunction } from "express";
import ModelUser from '../models/users';

const user = new ModelUser();

class UserController {
    async create(req:Request,res:Response,next:NextFunction){
        try{
            const result = await user.createUser(req.body);
            console.log(result);
            res.json({
                status:"sucess",
                data:{...result},
                "message":"user created finish"
            })
        }catch(error){
            
            next(error)
        }
    }
    async show(req:Request,res:Response,next:NextFunction){
        try{
            const result =await user.getOne_user(req.params.id as string );
            console.log("hello",result);

            res.json({
                status:"success",
                data:result,
                "message":"get user success"
            })
        }catch(error){
            
            next(error)
        }
    }
    async index(req:Request,res:Response,next:NextFunction){
        try{
            const result = await user.getMany_user();
            res.json({
                status:"success",
                data:result,
                "message":"all user here"
            })
        }catch(error){
            next(error)
        }
    }
    async update(req:Request,res:Response,next:NextFunction){
        try{
            const result = await user.update_user(req.body);
            res.json({
                status:"success",
                data:result,
                "message":"user update complete"
            })
        }catch(error){
            next(error)
        }
    }
    async delete(req:Request,res:Response,next:NextFunction){
        try{
            const result = await user.delete_user(req.params.id as string);
            res.json({
                status:"success",
                data:result,
                "message":"user update complete"
            })
        }catch(error){
            next(error)
        }
    }
    
}
export default UserController;