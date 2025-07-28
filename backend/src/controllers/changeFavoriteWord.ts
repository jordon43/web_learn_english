import { changeFavoriteWordService } from '../services/favoriteWordService.js'

export const changeFavoriteWord = async (req, res, next) => {
    try {
        console.log('req.body', req.body);
        const { id } = req.body
        const data = await changeFavoriteWordService(id)
        res.json(data)
    } catch (e) {
        console.log(e);
    }
}

// export deleteSavedWord