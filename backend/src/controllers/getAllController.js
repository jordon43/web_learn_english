import { getAllDataTable } from '../services/infoService.js'


export const getAllController = async (req, res, next) => {
  console.log('on dict');
  try {
    const data = await getAllDataTable();
    // console.log('tables: ', data)
    return data
    // res.json(users);
  } catch (err) {
    console.log(err)
  }
};