import express from 'express'
import { getAllDictionaryController } from '../controllers/dictionaryController.js'
import { getWordsController } from '../controllers/getWordsController.js'
import { addRepeatWord } from '../controllers/addRepeatWordController.js'
import { getRepeatWordsController } from '../controllers/getRepeatWordsController.js'
import { addSavedWord } from '../controllers/addSavedWord.js'
import { changeFavoriteWord } from '../controllers/changeFavoriteWord.js'
import {getFavoriteWordsController} from "../controllers/getFavoriteWordsController.js";
import {getSavedWordsController} from "../controllers/getSavedWordsController.js";
import {getAllController} from "../controllers/getAllController.js";
import {loginController} from "../controllers/loginController.js";
import {loginUserController, registerUserController} from "../controllers/loginUserController.js";
import {getUserInfo} from "../controllers/userController.js";

export const router = express.Router()



router.get('/', async(req, res, next) => {
    const data = await getAllController(req, res, next)
    console.log('data', data)
    res.json(data)
})

router.get('/get-all-dictionary', getAllDictionaryController)
router.get('/words', getWordsController)
router.get('/get-all-repeat', getRepeatWordsController)
router.get('/get-all-saved', getSavedWordsController)
router.get('/get-all-favorite', getFavoriteWordsController)
router.get('/get-user-info', getUserInfo)
// router.post('/login', loginController)


router.post('/add-repeat', addRepeatWord)
router.post('/add-saved', addSavedWord)
router.post('/change-favorite', changeFavoriteWord)

// router.post('/add-repeat', deleteRepeatWord)
// router.post('/add-saved', deleteSavedWord)



// router.post('/delete-favorite', deleteFavoriteWord)
// router.post('/delete-saved', deleteSavedWord)


