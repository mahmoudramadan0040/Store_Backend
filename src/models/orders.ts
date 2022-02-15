import db from '../database/index';
import Order from '../interfaces/order';
export enum OrderSql{
    create_order =`insert into orders(product_id,user_id,quantity,status)values($1,$2,$3,$4) returning product_id,user_id,quantity,status;`,
    current_order=`select * from orders where user_id=$1 ;`
}

export default class ModelOrder{
    async createOder(order:Order):Promise<Order>{
        try{
            const conn = await db.connect()
            const result =  await db.query(OrderSql.create_order,[
                order.product_id,
                order.user_id,
                order.quantity,
                order.status
            ])
            conn.release();
            return result.rows[0];
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