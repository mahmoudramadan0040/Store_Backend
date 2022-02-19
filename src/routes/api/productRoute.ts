import { Router , Request,Response } from "express";
import productController from "../../controllers/productController";
import auth_valid from "../../middlewares/auth_valid";
const routes =Router();
const prod = new productController();

routes.post('/',auth_valid, prod.create);
routes.get('/',prod.index);
routes.get('/:id',prod.show);
routes.delete('/:id',auth_valid,prod.delete);


export default routes;