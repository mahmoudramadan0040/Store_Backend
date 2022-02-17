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
        it("create product action method",async()=>{
            const createdProduct = await product.createProduct(test_product);
            const id =createdProduct.id;
            expect(createdProduct).toEqual({
                id,
                prod_name:"computer",
                price:23,
                category:"technology"
            })
        })
    })
})