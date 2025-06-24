import { pool } from "../../db.js"

export const getSavedWords = async() => {
    const data = await pool.query(`
        SELECT * FROM dict_words_test
        WHERE is_saved = true
        ORDER BY id ASC;
        `);
    return data.rows;
}

export const addSavedWordService = async (id) => {
    try {
        const result = await pool.query(`
            UPDATE dict_words_test
            SET is_saved = TRUE
            WHERE id = $1
            RETURNING *
            `, [id]
        );
        return result.rows
    }
    catch (e) {
        console.log(e);
    }
}