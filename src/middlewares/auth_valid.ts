import {Request ,Response ,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import configration from '../config/configration';



const auth_valid = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const headerToken = req.get('Authorization');
        if(headerToken){
            const bearer = headerToken.split(' ')[0].toLowerCase();
            const token =headerToken.split(' ')[1];
            if(token && bearer === 'bearer'){
                const checkToken = jwt.verify(token , "first_token" ); 
                if(checkToken){
                    next();
                }
                else{

                    const err = new Error('Login error please try again');
                    next(err)
                }
            }else{
                
                const err = new Error('Login error please try again');
                next(err)
            }
        }
    }catch(error){
        const err = new Error('Login error please try again');
        next(err)
    }
}
export default auth_valid;