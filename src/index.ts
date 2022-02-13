import express from 'express';
import configration from './config/configration';

const app =express();
console.log(configration);
const port = configration.port || 3000;
app.use(express.json());

app.listen(port,()=>{
     console.log(`server start listing on port ${port}`);
})
export default app;
