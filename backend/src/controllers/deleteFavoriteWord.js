import {} from '../services/favoriteWordService'

export const deleteFavoriteWord = async (req, res, next) => {
    try {
        const { id } = req.body
        const data = await deleteFavoriteWordService(id)
        res.json(data)
    } catch (e) {
        console.log(e);

    }
}

// export deleteSavedWord