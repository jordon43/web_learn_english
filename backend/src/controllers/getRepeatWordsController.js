import { getRepeatWords } from './../services/repeatWordsService.js'

export const getRepeatWordsController = async(req, res, next) => {
    try {
        const data = await getRepeatWords()
        res.json(data)
    } catch (e) {
        console.log(e);
    }
    
}