import { Router , Request,Response } from "express";
import UserController from "../../controllers/usersController";
import auth_valid from "../../middlewares/auth_valid";
const routes =Router();
const user = new UserController();
// create user
routes.post('/',user.create);
routes.post('/auth', user.authentication);
// get all user
routes.get('/',auth_valid,user.index);
// get one user
routes.get('/:id',auth_valid,user.show);
//delete one user
routes.delete("/:id",user.delete);
// update user
routes.patch("/",user.update);
// routes.get('/', user.index);
export default routes;