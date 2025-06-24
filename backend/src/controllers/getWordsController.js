import {getAllWords} from './../services/wordsService.js'


export const getWordsController = async (req, res, next) => { 
    try {
        const response = await getAllWords();
        const data = response.rows
        res.json(data)
        // console.log('response', data)
    } catch (err) {
        console.log(err)
    }
}