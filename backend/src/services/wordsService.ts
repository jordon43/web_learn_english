import { pool } from '../../db.js';

export const getAllWords = async (limit = 100, offset = 0) => {
  const { rows } = await pool.query(
    `SELECT *
       FROM dict
      ORDER BY id ASC
      LIMIT  $1
      OFFSET $2`,
    [limit, offset],
  );

  return rows;
};