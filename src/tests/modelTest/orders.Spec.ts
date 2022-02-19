import ModelOrder from "../../models/orders";
import db from '../../database/index';
import User from "../../interfaces/user";
import ModelUser from "../../models/users";
import ModelProduct from "../../models/products";
import Product from "../../interfaces/product";
import { orderBase } from "../../interfaces/order";
const user = new ModelUser();
const prod =new ModelProduct();
describe("TEST Order Model",()=>{
    const orders = new ModelOrder();
    describe("Test all orders be defined",()=>{
        it("create product  method defined",()=>{
            expect(orders.createOder).toBeDefined();
        })
        it("delete orders method defined",()=>{
            expect(orders.currentOrder).toBeDefined();
        })
    })
    describe("Test all orders function",()=>{
        const test_user ={
            username:"mahmoud0020",firstname:"mahmoud",lastname:"ramadan",email:"0helloword@gmail.com",password:"moon"
        } as User;
        const newProduct = {
            prod_name:"keyboard",
            price:20,
            category:"tec"
        } as Product;
        let order_test:orderBase,user_id: string|undefined,productId;
        
        beforeAll(async()=>{

            // create user
            const created_User = await user.createUser(test_user);
            user_id = created_User.id;
            
            // create product 
            const created_product =await prod.createProduct(newProduct);
            productId =created_product.id;
            
            order_test = {
                products:{
                    product_id:productId as string,
                    quantity :20
                },
                order:{
                    user_id: user_id as string,
                    status:"active" 
                }
            };

        })
        afterAll(async()=>{
            try{
                const conn =await db.connect();
                const sql = 'delete from orders;';
                const sql_2 = 'delete from order_product;';
                await conn.query(sql);
                await conn.query(sql_2)
                await conn.release();
            }catch(error){
                throw new Error("can not delete the users table ")
            }
        })
        it("Test order create by user",async()=>{
            const created_order = await orders.createOder(order_test);
            expect(created_order.status).toEqual(order_test.order.status)
            expect(created_order.user_id).toEqual(order_test.order.user_id)
        })
        it("Test currentOrder function ",async()=>{
            const currentOrder = await orders.currentOrder(user_id as string)
            expect(currentOrder.status).toEqual(order_test.order.status)
            expect(currentOrder.user_id).toEqual(order_test.order.user_id)
        })
    })
})