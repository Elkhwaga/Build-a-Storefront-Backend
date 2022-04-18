import { Pool } from 'pg';
import config from '../config';

const pool: Pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
});

pool.on('error', (error): void => {
  console.error(error);
});

export default pool;
