import Product from '../interfaces/product';
import db from '../database/index';

export enum SqlProduct{
    one_product ='select prod_name,price,category,id from product where id =$1 ;',
    all_products ='select * from product;',
    create_product ='insert into product(prod_name,price,category) values($1,$2,$3) returning id,prod_name,price,category;',
    delete_product ='delete from product where id=$1 returning id;'
}

export default class ModelProduct{
    async getOne_prod(id:string):Promise<Product>{
        try{
            const conn =  await db.connect()
            const result = await conn.query(SqlProduct.one_product,[id]);
            conn.release();
            return result.rows[0];
        }catch(error){
            throw new Error("can't get item of product");
        }
    }
    async getMany_prod():Promise<Product[]>{
        try{
            const conn =await db.connect()
            const result = await conn.query(SqlProduct.all_products);
            conn.release();
            return result.rows;
        }catch(error){
            throw new Error("can't get all product");
        }
    }
    async createProduct(prod:Product):Promise<Product>{
        try{

            const conn = await db.connect();
            const result =await conn.query(SqlProduct.create_product,[
                prod.prod_name,
                prod.price,
                prod.category
            ]);
            conn.release();
            return result.rows[0];
        }catch(error){
            throw new Error("product unaple to create ");
        }
    }
    async deleteProduct (id:string):Promise<Product>{
        try{
            const conn =await db.connect();
            const result =await conn.query(SqlProduct.delete_product,[id]);
            conn.release();
            return result.rows[0];
        }catch(error){
            throw new Error("can not delete the product ");
        }
    }
    

}