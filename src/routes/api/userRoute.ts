import { Router , Request,Response } from "express";
import UserController from "../../controllers/usersController";
 
const routes =Router();
const user = new UserController();
// create user
routes.post('/', user.create);
routes.post('/auth', user.authentication);
// get all user
routes.get('/',user.index);
// get one user
routes.get('/:id',user.show);
//delete one user
routes.delete("/:id",user.delete);
// update user
routes.patch("/",user.update);
// routes.get('/', user.index);
export default routes;