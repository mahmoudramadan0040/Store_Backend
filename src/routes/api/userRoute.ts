import { Router , Request,Response } from "express";
import UserController from "../../controllers/usersController";
 
const routes =Router();
const user =new UserController();
routes.get('/',user.create);

export default routes;