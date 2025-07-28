import { pool } from '../../db.js'

export async function getAllDictionary() {

  const result = await pool.query(`SELECT * FROM test_table`);
  return result.rows;
}