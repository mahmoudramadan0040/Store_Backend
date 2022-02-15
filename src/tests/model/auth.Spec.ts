import ModelUser from '../../models/users';
import Encryption from '../../security/encryption_auth';
import User from '../../interfaces/user';
import db from '../../database/index';


const user =new ModelUser();
const encryption = new Encryption();

describe('Authentication Users',()=>{
    describe('Test auth method exists or not',()=>{
        it("Auth method exists ! ",()=>{
            expect(encryption.auth).toBeDefined();
        })
    })
    describe('Test Authentication process ',()=>{
        const test_user ={
            username:"mahmoud0020",
            firstname:"mahmoud",
            lastname:"ramadan",
            email:"09999@gmail.com",
            password:"moon"
        } as User;
        // created user before authentication
        beforeAll(async()=>{
            
            const created_User = await user.createUser(test_user);
            
            test_user.id = created_User.id;
            
        })
        
        it("Test the auth mehtod retun the authed user",async()=>{
            const auth_user = await encryption.auth(test_user.email ,test_user.password )

            expect(auth_user?.username).toBe('mahmoud0020');
            expect(auth_user?.firstname).toBe('mahmoud');
            expect(auth_user?.lastname).toBe('ramadan');
        })
        it(" Login with wrong crediential ",async()=>{
            const auth_user = await encryption.auth("wrong@email.com","wrongPassword");
            expect(auth_user).toBe(null);
        })
        
        // delete user 
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
        
    })
});