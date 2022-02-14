
import User from '../interfaces/user';
import db from '../database/index'
enum Sql{ 
    createUser =`insert into users(username,firstname,lastname,email,password) 
    values ($1,$2,$3,$4,$5) returning username,firstname,lasrname,email,password,id;`,
    all_user=`select * from users returning username,firstname,email,password;`,
    one_user=`select username,firstname,lastname,email from users where id=$1;`
}
export default class ModelUser{
    async createUser(user:User):Promise<User>{
        try{ 
            const conn = await db.connect()
            const result =await  conn.query(Sql.createUser,[
                user.username,
                user.firstname,
                user.lastname,
                user.email,
                user.password
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
            const result =await conn.query(Sql.one_user);
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
    
}