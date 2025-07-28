import { pool } from '../../db.js';

export async function getAllDataTable() {
  const tablesQuery = `
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
  `;

  const tablesResult = await pool.query(tablesQuery);
  const tableNames = tablesResult.rows.map(row => row.table_name);

  const data = {};

  for (const tableName of tableNames) {
    const tableData = await pool.query(`SELECT * FROM ${tableName};`);
    data[tableName] = tableData.rows;
  }

  return data;
}