const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL 
});

pool.connect((err) => {
    if (err) console.error('PostgreSQL 연결 실패:', err.stack);
    else console.log('PostgreSQL 연결 성공');
});

module.exports = pool;