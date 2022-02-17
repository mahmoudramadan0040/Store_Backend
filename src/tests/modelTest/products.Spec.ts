import ModelProduct from "../../models/products";
import db from '../../database/index';
import Product from '../../interfaces/product';

const product  =new ModelProduct();
describe("TEST Product Model",()=>{
    const product = new ModelProduct();
    describe("Test all method be defined",()=>{
        it("create product  method defined",()=>{
            expect(product.createProduct).toBeDefined();
        })
        it("delete product method defined",()=>{
            expect(product.deleteProduct).toBeDefined();
        })
        it("get all product  method defined",()=>{
            expect(product.getMany_prod).toBeDefined();
        })
        it("get one product method defined",()=>{
            expect(product.getOne_prod).toBeDefined();
        })

    })
    describe("Test Product model function",()=>{
        const test_product ={
            
            prod_name:"computer",
            price:23,
            category:"technology"
        }as Product

        const test_product_2 ={
            
            prod_name:"computer",
            price:23,
            category:"technology"
        }as Product
        afterAll(async()=>{
            try{
                const conn =await db.connect();
                const sql = 'delete from product;';
                await conn.query(sql);
                await conn.release;
            }catch(error){
                throw new Error("can not delete the product table ")
            }
        })
        it("create product action method",async()=>{
            const createdProduct = await product.createProduct(test_product);
            const id =createdProduct.id;
            test_product.id=createdProduct.id;
            expect(createdProduct).toEqual({
                id,
                prod_name:"computer",
                price:23,
                category:"technology"
            })
        })
        it("Get one product action method ",async()=>{
            const getone = await product.getOne_prod(test_product.id as string)
            expect(getone).toEqual(test_product)
        })
        it("Get all product action method ",async()=>{
            const getAll =await product.getMany_prod();
            expect(getAll.length).toBe(2);
        })
        it(" Delete product action method",async()=>{
            const delete_product = await product.deleteProduct(test_product.id as string);
            expect(delete_product.id).toBe(test_product.id);
        })


    })
})