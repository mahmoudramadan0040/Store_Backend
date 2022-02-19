import { Request,Response,NextFunction } from "express";
import ModelUser from '../models/users';
import Encryption from "../security/encryption_auth";
import Jwt from 'jsonwebtoken'
import configration from "../config/configration";

const user = new ModelUser();

class UserController {
    async create(req:Request,res:Response,next:NextFunction){
        try{
            const result = await user.createUser(req.body);
            
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
    async authentication (req:Request,res:Response,next:NextFunction){
        try{
            const email =req.body.email;
            
            const password =req.body.password;
            
            const auth = new Encryption()
            const user_auth = await auth.auth(email,password); 
            
            const token = Jwt.sign({user_auth},configration.token_secret as string )
            
            if(user_auth == null){
                return res.status(401).json({
                    status:"error failed login ",
                    message:'the user and password not correct please typ agiain'
                });
            }else {
                return res.json({
                    status:'success',
                    data:{...user_auth,token},
                    message:"user authed success"
                })
            }
        }catch(error){
            return next(error);
        }
    }
    
}
export default UserController;