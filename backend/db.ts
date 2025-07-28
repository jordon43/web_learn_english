import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'konsta',
  host: 'localhost',
  database: 'DB_FOR_LEARN_LANG',
  password: '',
  port: 5432,
});
