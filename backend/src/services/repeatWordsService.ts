import { pool } from '../../db.js'

export const getRepeatWords = async() => {
    const data = await pool.query(`
        SELECT * FROM dict_words_test
        WHERE is_repeat = true
        ORDER BY id ASC;
        `);
    return data.rows;
}

export async function addRepeatWordService(id) {
  // console.log('id', id)
  //TODO Проверка на валидацию
  try {
    const result = await pool.query(`
      UPDATE dict_words_test
      SET is_repeat = TRUE
      WHERE id = $1
      RETURNING *
      `, [id]
    );
    return result.rows
    console.log('result', result)
  }
  catch (e) {
    console.log('e', e);
  }
  
  // return result.rows;
}


