import {getSavedWords} from "../services/savedWordsService.js";

export const getSavedWordsController = async(req, res, next) => {
  try {
    const data = await getSavedWords()
    res.json(data)
  } catch (e) {
    console.log(e);
  }
}