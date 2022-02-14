
import User from '../interfaces/user';
import db from '../database/index'
import Encryption from '../security/encryption_auth';
export enum Sql{ 
    createUser =`INSERT INTO users(username,firstname,lastname,email,password) values ($1,$2,$3,$4,$5) 
    returning id,username,firstname,lastname,email,password;`,
    all_user=`select * from users ;`,
    one_user=`select username,firstname,lastname,email from users where id=$1;`,
    update_user=`update users set username=$1,firstname=$2,lastname=$3,email=$4,password=$5 where id=$6
    returning id,username,firstname,lastname,email`,
    delete_user=`delete from users where id=$1
    returning id,username,firstname,lastname,email`,
    user_check = 'select password from users where email=$1',
    auth_user ='select id,username,firstname,lastname from users where email=$1'
}
const encryption =new Encryption();
export default class ModelUser{
    
    async createUser(user:User):Promise<User>{
        try{ 
            
            const conn = await db.connect();
        
            const result =await conn.query(Sql.createUser ,[
                user.username,
                user.firstname,
                user.lastname,
                user.email,
                await encryption.hashPassword(user.password)
            ]);
            
            conn.release();
            return result.rows[0];

        }catch(error){
            throw new Error('unable to create user');
        }
    }
    async getOne_user(id:string):Promise<User>{
        try{
            const conn =await db.connect();
            const result =await conn.query(Sql.one_user,[id]);
            conn.release();
            return result.rows[0];
        }catch(error){
            throw new Error("unable to find the user")
        }
    }
    async getMany_user():Promise<User[]>{
        try{
            const conn =await db.connect();
            const reuslt =await conn.query(Sql.all_user);
            conn.release();
            return reuslt.rows;

        }catch(error)
        {
            throw new Error("unable to show all users");
        }
    }
    async update_user(user:User):Promise<User>{
        try{
            const conn =await db.connect();
            const reuslt =await conn.query(Sql.update_user,[
                user.username,
                user.firstname,
                user.lastname,
                user.email,
                await encryption.hashPassword(user.password)
            ]);
            conn.release();
            return reuslt.rows[0];
        }catch(erro){
            throw new Error("unable to update users");
        }
    }
    async delete_user(id:string):Promise<User>{
        try{
            const conn =await db.connect();
            const reuslt =await conn.query(Sql.delete_user,[id]);
            conn.release();
            return reuslt.rows[0];
        }catch(erro){
            throw new Error("cannot delete user");
        }
    }
    
}