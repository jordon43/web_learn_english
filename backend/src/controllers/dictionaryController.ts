import { getAllDictionary } from '../services/dictionaryService.js'


export const getAllDictionaryController = async (req, res, next) => {
  console.log('on dict');
  try {
    const users = await getAllDictionary();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// const createUser = async (req, res, next) => {
//   try {
//     const newUser = await dictionaryService.createUser(req.body);
//     res.status(201).json(newUser);
//   } catch (err) {
//     next(err);
//   }
// };
