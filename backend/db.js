import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'konsta',
  host: 'localhost',
  database: 'postgress_learn_english',
  password: '',
  port: 5432,
});
