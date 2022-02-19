import supertest from "supertest";
import db from '../../database/index';
import app from '../../index';
import User from "../../interfaces/user";
import ModelUser from "../../models/users";

const req = supertest(app);
const user = new ModelUser();
let token ='';
describe("Test User EndPoint",()=>{

    const test_user ={
        username:"mahmoud0030",firstname:"mahmoud",lastname:"ramadan",email:"test_1@gmail.com",password:"moon"
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
            conn.release();
        }catch(error){
            throw new Error("can not delete the users table ")
        }
    })

    describe('Test auth methods',()=>{
        it("should return token",async()=>{
            const res = await req.post('/api/users/auth')
            .set('Content-type','application/json')
            .send({
                email:"test_1@gmail.com",password:"moon"
            })
            expect(res.status).toBe(200);
            
            expect(res.body.data.username).toBe(test_user.username);
            expect(res.body.data.firstname).toBe(test_user.firstname);
            expect(res.body.data.lastname).toBe(test_user.lastname);
            
            token = res.body.data.token;

        })
        it("should be failed to auth wrong email",async()=>{
            const res =await req.post('/api/users/auth')
            .set('Content-type','application/json')
            .send({
                email:"wrong@gmail.com",
                password:"moon"
            })
            expect(res.status).toBe(401);
        })
    })
    describe("Test CRUD methods",()=>{
        it("should create new user ",async()=>{
            const res =await  req.post('/api/users')
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` ).send({
                firstname:"ahmed",
                lastname:"ali",
                username:"ahmed32",
                email:"test_2@gmail.com",
                password:"moon"
            });
            expect(res.status).toBe(200)
            expect(res.body.data.username).toBe('ahmed32')
            expect(res.body.data.firstname).toBe('ahmed')
            expect(res.body.data.lastname).toBe('ali')
            expect(res.body.data.email).toBe('test_2@gmail.com')
        })

        it("should show one user ",async()=>{
            const res =await  req.get(`/api/users/${test_user.id}`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` )
                
            expect(res.status).toBe(200)
            expect(res.body.data.username).toBe('mahmoud0030')
            expect(res.body.data.firstname).toBe('mahmoud')
            expect(res.body.data.lastname).toBe('ramadan')
            expect(res.body.data.email).toBe('test_1@gmail.com')
        })
        
        it("should show all user ",async()=>{
            const res =await req.get(`/api/users`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` )
                
            expect(res.status).toBe(200)
            expect(res.body.data.length).toBe(3)
        })

        it("update  one user ", async ()=>{
            const res =await  req.patch(`/api/users`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` )
            .send({
                firstname:"ramadan",
                lastname:"ahmed",
                username:"mahmoud",
                email:"test_3@gmail.com",
                password:"moon",
                id:test_user.id
            });
                
            expect(res.status).toBe(200)
            expect(res.body.data.username).toBe('mahmoud')
            expect(res.body.data.firstname).toBe('ramadan')
            expect(res.body.data.lastname).toBe('ahmed')
            expect(res.body.data.email).toBe('test_3@gmail.com')
        })
        it("delete  one user ", async ()=>{
            const res =await  req.delete(`/api/users/${test_user.id}`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` )
            
            expect(res.status).toBe(200)
            expect(res.body.data.username).toBe('mahmoud')
            expect(res.body.data.firstname).toBe('ramadan')
            expect(res.body.data.lastname).toBe('ahmed')
            expect(res.body.data.email).toBe('test_3@gmail.com')
        })
    })
})