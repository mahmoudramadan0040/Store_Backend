import express from 'express';
import morgan from 'morgan';
import configration from './config/configration';
import ErrMiddleware from './middlewares/erorrs';
import routes from './routes';
const app = express();




const port = configration.port || 3000;
app.use(morgan('common'));
app.use(express.json());
app.use('/api',routes);
// error handler middleware 
const err =new ErrMiddleware();
app.use(err.error);
app.listen(port,()=>{
     console.log(`server start listing on port ${port}`);
})
export default app;
