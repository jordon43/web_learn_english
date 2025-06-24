import { pool } from './../../db.js'

export const getAllWords = async() => {
    const data = await pool.query(`
        SELECT * FROM dict_words_test
        WHERE is_saved = FALSE OR is_repeat = FALSE
        ORDER BY id ASC;
     `);
    return data;
}

