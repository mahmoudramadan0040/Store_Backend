import ModelUser from "../../models/users";
import db from '../../database/index';
import User from "../../interfaces/user";

const user = new ModelUser();
describe('TEST USERS Model',()=>{
    describe('TEST All method be defined',()=>{
        it("create method defined",()=>{
            expect(user.createUser).toBeDefined();
        })
        it("get one user  method defined",()=>{
            expect(user.getOne_user).toBeDefined();
        })
        it("get all user method defined",()=>{
            expect(user.getMany_user).toBeDefined();
        })
        it("delete user method defined",()=>{
            expect(user.delete_user).toBeDefined();
        })
        it("update user method defined",()=>{
            expect(user.update_user).toBeDefined();
        })
    })
    describe("Test User model function ",()=>{
        const test_user ={
            username:"mahmoud0020",firstname:"mahmoud",lastname:"ramadan",email:"09999@gmail.com",password:"moon"
        } as User;
        const test_user_2 ={
            username:"mahmoud0030",firstname:"mahmoud",lastname:"ramadan",email:"666@gmail.com",password:"moon"
        } as User;
        beforeAll(async()=>{
            const created_User = await user.createUser(test_user);
            test_user.id = created_User.id;
        })
        afterAll(async()=>{
            try{
                const conn =await db.connect();
                const sql = 'delete from users;';
                await conn.query(sql);
                await conn.release;
            }catch(error){
                throw new Error("can not delete the users table ")
            }
            
        })
        it('create user action method',async()=>{
            const created_User =await user.createUser(test_user_2);
            expect(created_User).toEqual({
                id:created_User.id,
                username:"mahmoud0030"
                ,firstname:"mahmoud",
                lastname:"ramadan",
                email:"666@gmail.com",
                password:created_User.password
            }as User);

        })
        it("Get all user in db",async()=>{
            const all_user =await user.getMany_user();
            expect(all_user.length).toBe(3);
        })
        it("Get one user function",async()=>{
            const oneUser= await user.getOne_user(test_user.id as string)
            expect(oneUser.firstname).toBe(test_user.firstname);
            expect(oneUser.email).toBe(test_user.email);
            expect(oneUser.lastname).toBe(test_user.lastname);
            expect(oneUser.username).toBe(test_user.username);
        })
        
        it("update user function",async()=>{
            const userUpdate = await user.update_user({
                ...test_user,
                firstname:"ahmed",
                username:"ahmed606",
                lastname:"ramadan ahmed"
            })
            
            expect(userUpdate.id).toBe(test_user.id)
            expect(userUpdate.firstname).toBe('ahmed')
            expect(userUpdate.lastname).toBe('ramadan ahmed')
            expect(userUpdate.username).toBe('ahmed606')
        })
        
        it("delete user function",async()=>{
            const userDelete =await user.delete_user(test_user.id as string)
            expect(userDelete.id).toBe(test_user.id);
        })
    })

})