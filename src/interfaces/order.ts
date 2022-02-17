interface Order{
    id?:string,
    user_id:string,
    status:string
}
export interface ProductOrder {
    product_id:string,
    quantity:number,
}

export interface orderBase{
    id?:string,
    products:ProductOrder,
    order:Order
}

export default Order;

