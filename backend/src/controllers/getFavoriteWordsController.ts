import {getFavoriteWords} from "../services/favoriteWordService.js";

export const getFavoriteWordsController = async (req, res) => {
  try {
    const result = await getFavoriteWords()
    res.json(result)
  } catch (e) {
    console.log(e)
  }
}