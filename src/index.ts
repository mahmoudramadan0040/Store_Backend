import express from 'express';
import configration from './config/configration';
import routes from './routes';
const app = express();
console.log(configration);
const port = configration.port || 3000;
app.use(express.json());
app.use('/api',routes);
// import db from './database/index';
// db.connect().then((client)=>{
//      return client.query('select now()').then((res)=>{
//        client.release();
//        console.log(res.rows);
       
//      }).catch((err)=>{
//        client.release();
//        console.log(err.stack);
       
//      })
//    })

app.listen(port,()=>{
     console.log(`server start listing on port ${port}`);
})
export default app;
