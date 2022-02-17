import { Router , Request,Response } from "express";
import auth_valid from "../../middlewares/auth_valid";
import orderController from "../../controllers/orderController";
const routes =Router();

const order =new orderController();
routes.post('/', order.create);
routes.get('/:id',auth_valid,order.getCurrentOreder);


export default routes;