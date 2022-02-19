import supertest from "supertest";
import db from '../../database/index';
import app from '../../index';
import Product from "../../interfaces/product";
import User from '../../interfaces/user';
import { orderBase } from "../../interfaces/order";
import ModelProduct from "../../models/products";
import ModelUser from '../../models/users';


const req = supertest(app);
const product = new ModelProduct();
const user = new ModelUser();
let token ='';
describe("Test Order EndPoint",()=>{
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
        email:"testorder@gmail.com",
        password:"moon"
    } as User;

    beforeAll(async()=>{
        // created product
        const created_product = await product.createProduct(test_product);
        test_product.id = created_product.id;

        // create user for test 
        const created_user = await user.createUser(test_user); 
        test_user.id = created_user.id;
        // authenticate this user and get token 
        const res = await req.post('/api/users/auth')
        .set('Content-type','application/json')
        .send({
            email:"testorder@gmail.com",password:"moon"
        })
        token = res.body.data.token;
    })
    afterAll(async()=>{
        try{
            const conn =await db.connect();
            const sql = 'delete from orders;';
            const sql_2 = 'delete from order_product;';
            await conn.query(sql);
            await conn.query(sql_2)
            conn.release();
        }catch(error){
            throw new Error("can not delete the orders,order_product table ")
        }
    })

    
    describe("Test methods Orders",()=>{
        it("should create new order ",async()=>{
            const res =await  req.post('/api/order')
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` ).send({
                "products":{
                    "product_id":test_product.id,
                    "quantity":20
                },
                "order":{
                    "user_id":test_user.id,
                    "status":"active"
                }
            });
            expect(res.status).toBe(200)
            expect(res.body.data.user_id).toBe(test_user.id)
            expect(res.body.data.status).toBe('active')
            expect(res.body.data.products.product_id).toBe(test_product.id);
            expect(res.body.data.products.quantity).toBe(20);
        })


        it("should show one order ",async()=>{
            const res =await  req.get(`/api/order/${test_user.id}`)
            .set('Content-type','application/json')
            .set('Authorization',`Bearer ${token}` )
            expect(res.status).toBe(200)
            expect(res.body.data.status).toBe('active')
            expect(res.body.data.user_id).toBe(test_user.id)
            
        })
    })
})

