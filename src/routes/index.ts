import {Router} from 'express';
import userRoute from './api/userRoute'

const routes =Router();

routes.use('/users',userRoute)
export default routes;