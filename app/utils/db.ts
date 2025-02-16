import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: process.env.DB_LOCATE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

export default pool;