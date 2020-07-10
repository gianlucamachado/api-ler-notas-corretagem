const Pool = require('pg').Pool;
const dotenv = require('dotenv').config().parsed;

const pool = new Pool({
  user: dotenv.DB_USER,
  host: dotenv.DB_HOST,
  database: dotenv.DB_DATABASE,
  password: dotenv.DB_PASS,
  port: dotenv.DB_PORT,
});

module.exports = pool;