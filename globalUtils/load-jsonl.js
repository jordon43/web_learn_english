// ------------------------------------------------------------------
// node load-jsonl.js path/to/file.jsonl
// ------------------------------------------------------------------
import fs from 'node:fs';
import readline from 'node:readline/promises';
import { Pool } from 'pg';
import 'dotenv/config';

if (process.argv.length < 3) {
  console.error('Usage: node load-jsonl.js <file.jsonl>');
  process.exit(1);
}
console.log('process', process.env)

const file = process.argv[2];
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

const INSERT = `
  INSERT INTO dict (word, pos, ipa, translations)
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (word, pos)
    DO UPDATE SET ipa = EXCLUDED.ipa,
                  translations = EXCLUDED.translations;
`;

async function run() {
  const client = await pool.connect();
  let inserted = 0, updated = 0;

  try {
    await client.query('BEGIN');
    const rl = readline.createInterface({
      input: fs.createReadStream(file, { encoding: 'utf8' }),
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      if (!line.trim()) continue;        // пропустить пустые строки
      const obj = JSON.parse(line);

      // гарантируем одномерный массив переводов
      const ru = Array.isArray(obj.ru) ? obj.ru : [obj.ru];

      const res = await client.query(INSERT, [
        obj.word,
        obj.pos,
        obj.ipa ?? null,
        ru
      ]);

      // res.command = 'INSERT' или 'UPDATE'
      if (res.command === 'INSERT') inserted++;
      else updated++;
    }

    await client.query('COMMIT');
    console.log(`✓ Done. Inserted ${inserted}, updated ${updated}.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    client.release();
    pool.end();
  }
}

run();