// controllers/wordsController.js
import { getAllWords } from '../services/wordsService.js';

export const getWordsController = async (req, res, next) => {
    try {
        // ----- читаем query-параметры -----
        const limit = Math.min(Number(req.query.limit) || 100, 500); // максимум 500
        const page  = Math.max(Number(req.query.page)  || 1,   1);

        const offset = (page - 1) * limit;

        // ----- запрос -----
        const rows = await getAllWords(limit, offset);

        // ----- отдаём вместе с метаданными -----
        res.json({ page, limit, rows });
    } catch (err) {
        next(err);           // отдай в express-error-handler
    }
};