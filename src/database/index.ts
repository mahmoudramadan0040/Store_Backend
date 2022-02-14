import { Pool } from "pg";
import configration from '../config/configration';

// console.log(configration);

const pool =new Pool({
    host:configration.db_host,
    database:configration.db,
    user:configration.db_user,
    password:configration.db_password,
    port:configration.db_port,
})

export default pool;
