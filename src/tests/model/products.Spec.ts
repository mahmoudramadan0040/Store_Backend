import ModelProduct from "../../models/products";
import db from '../../database/index';



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
})