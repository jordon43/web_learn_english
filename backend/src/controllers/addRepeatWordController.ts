import { addRepeatWordService } from '../services/repeatWordsService.js'


export const addRepeatWord = async(req, res, next) => {
    // console.log('req', req.body);
    try {
        const response = await addRepeatWordService(req.body.id)
        res.json(response)
        console.log('response', response);
    } catch (e) {
        next()
    }
    // res.json(`POST request to homepage ${req.body}`)
}
