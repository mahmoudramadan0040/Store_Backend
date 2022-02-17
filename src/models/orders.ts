import db from '../database/index';
import {ProductOrder,orderBase} from '../interfaces/order';
import Order from '../interfaces/order';
export enum OrderSql{
    sql_ord =`insert into orders( user_id,status) values($1,$2) returning * ;`,
    create_order =`insert into order_product(order_id,product_id,quantity)values($1,$2,$3) returning product_id,quantity;`,
    current_order=`select * from orders where user_id=$1 ;`
}


export default class ModelOrder{
    async createOder(order:orderBase):Promise<Order>{
        try{
            
            const conn = await db.connect()
            const resultOrder =  await db.query(OrderSql.sql_ord,[order.order.user_id,order.order.status]);
            const result_order_product = await db.query(OrderSql.create_order,[resultOrder.rows[0].id,order.products.product_id,order.products.quantity]);
            conn.release();
            return {...resultOrder.rows[0],
                    products:result_order_product.rows[0]};
        }catch(err){
            throw new Error("can't create order");
        }
    }
    async currentOrder(user_id:string):Promise<Order>{
        try{
            const conn = await db.connect()
            const result =await db.query(OrderSql.current_order,[user_id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error("can't get current order")
        }
    }
}