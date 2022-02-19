import supertest from "supertest";
import db from '../../database/index';
import app from '../../index';
import Product from "../../interfaces/product";
import User from '../../interfaces/user'
import ModelProduct from "../../models/products";
import ModelUser from '../../models/users';


const req = supertest(app);
const product = new ModelProduct();
const user = new ModelUser();
let token ='';
describe("Test User EndPoint",()=>{
    token = '';
    const test_product = {
        prod_name:"computer",
        price:23,
        category:"technology"
    }as Product;
    const test_user ={
        username:"user_prod",
        firstname:"user_prod",
        lastname:"user_prod",
        email:"user_prod@gmail.com",
        password:"moon"
    } as User;

    beforeAll(async()=>{
        const created_product = await product.createProduct(test_product);
        test_product.id = created_product.id;

        // create user for test 
        const created_user = await user.createUser(test_user); 
        // authenticate this user and get token 
        const res = await req.post('/api/users/auth')
        .set('Content-type','application/json')
        .send({
            email:"user_prod@gmail.com",password:"moon"
        })
        token = res.body.data.token;
    })
    afterAll(async()=>{
        try{
            const conn =await db.connect();
            const sql = 'delete from product;';
            await conn.query(sql);
            conn.release();
        }catch(error){
            throw new Error("can not delete the product table ")
        }
    })

    
    describe("Test CRUD methods product",()=>{
        it("should create new product ",async()=>{
            const res =await  req.post('/api/product')
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` ).send({
                prod_name:"mouse",
                price:50,
                category:"technology"
            });
            expect(res.status).toBe(200)
            expect(res.body.data.prod_name).toBe('mouse')
            expect(res.body.data.price).toBe(50)
            expect(res.body.data.category).toBe('technology')
        })


        it("should show one product ",async()=>{
            const res =await  req.get(`/api/product/${test_product.id}`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` )
                
            expect(res.status).toBe(200)
            expect(res.body.data.prod_name).toBe('computer')
            expect(res.body.data.price).toBe(23)
            expect(res.body.data.category).toBe('technology')
            
        })
        
        it("should show all product ",async()=>{
            const res =await req.get(`/api/product`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` )
                
            expect(res.status).toBe(200)
            expect(res.body.data.length).toBe(3)
        })
    })
})