import { addSavedWordService } from '../services/savedWordsService.js'

export const addSavedWord = async (req, res, next) => {
    try {
        const { id } = req.body
        const data = await addSavedWordService(id)
        res.json(data)
    } catch (e) {
        console.log(e);

    }
}

// export deleteSavedWord