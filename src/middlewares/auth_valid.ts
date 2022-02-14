import {Request ,Response ,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import configration from '../config/configration';



const auth_valid = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        
        const headerToken = req.get('Authorization');
        console.log("header",headerToken)
        if(headerToken){
            
            const bearer = headerToken.split(' ')[0].toLowerCase();
            
            const token =headerToken.split(' ')[1];
            
            if(token && bearer === 'bearer'){
                console.log("configration.token_secret",configration.token_secret)
                console.log(token)
                const checkToken = jwt.verify(token , "first_token" ); 
                console.log(checkToken)
                if(checkToken){
                    next();
                }
                else{
                    console.log("err1")
                    const err = new Error('Login error please try again');
                    next(err)
                }
            }else{
                console.log("err2")
                const err = new Error('Login error please try again');
                next(err)
            }
        }
    }catch(error){
        console.log("err3")
        const err = new Error('Login error please try again');
        next(err)
    }
}
export default auth_valid;