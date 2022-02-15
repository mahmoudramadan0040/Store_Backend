import configration from "../config/configration";
import bcrypt from 'bcrypt';
import User from "../interfaces/user";
import db from '../database/index';
import { Sql } from "../models/users";
class Encryption{
    async hashPassword(password:string):Promise<string>{
        const salt = parseInt(configration.salt as string)
        console.log(salt)
        const result =bcrypt.hashSync(`${password}${configration.pepper}`,salt);
        console.log(result);
        return bcrypt.hashSync(`${password}${configration.pepper}`,salt);
    }
    
    async auth(email: string ,password:string): Promise<User| null> {
        try{
            
            const conn =await db.connect();
            const result= await conn.query(Sql.user_check,[email]);
            console.log(result.rows[0]);
            const hashPassword = result.rows[0].password;
            const check_password = bcrypt.compareSync(`${password}${configration.pepper}`,hashPassword );
            console.log(check_password)
            if(check_password){
                const auth_user =await conn.query(Sql.auth_user,[email]);
                return auth_user.rows[0];
            }
            conn.release()
            return null ;
        }catch(error){
            return null ;
            throw new Error("user can not be autherized")
        }
    }

}
export default Encryption;