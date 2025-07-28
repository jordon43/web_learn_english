import {Request, Response} from "express";
import {findUserByLogin} from "../models/userModel.js";
import {User} from "../types/User.js";
import {verifyAccessToken} from "../utils/jwt.js";


export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const accessToken = req?.cookies?.['accessToken']
    const dataUser = verifyAccessToken(accessToken);
    const user: User | null = await findUserByLogin(dataUser.username);
    console.log('user', user)
    res.status(200).json({
      id: dataUser.id,
      username: dataUser.username
    })
  } catch (e) {
    console.log(e)
  }
}