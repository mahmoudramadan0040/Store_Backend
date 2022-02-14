import { Request,Response,NextFunction } from "express";
import ModelUser from '../models/users';

const user = new ModelUser();

class UserController {
    async create(req:Request,res:Response,next:NextFunction){
        try{
            const result = await user.createUser(req.body);
            res.json({
                status:"sucess",
                data:{result},
                "message":"user created finish"
            })
        }catch(error){
            next(error)
        }
    }
}
export default UserController;