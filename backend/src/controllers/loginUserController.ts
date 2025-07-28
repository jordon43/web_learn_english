import bcrypt from 'bcrypt';
import {findUserByLogin, setUser} from "../models/userModel.js";
import {User} from "../types/User.js";
import { Request, Response } from 'express';
import {generateAccessToken, generateRefreshToken, verifyAccessToken} from "../utils/jwt.js";
import {findRefreshToken, invalidateRefreshToken, setRefreshToken} from "../models/refreshTokenModel.js";
import {RefreshTableItem} from "../types/Refresh.js";


export const logoutUserController = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.status(204).json("Пошел нахуй с сайта")
}

export const registerUserController = async(req: Request, res: Response): Promise<void> => {
  const { login, password } = req.body as any;
  try {
    const user: User | null = await findUserByLogin(login);
    if (user) {
      res.status(409).json('Такой username уже есть')
      return
    }

    const hashPassword = await bcrypt.hash(password, 10)
    await setUser({username: login, password_hash: hashPassword})
    res.status(200).json('Пользователь успешно добавлен')
  } catch (e) {
    console.error(e)
  }
}


export const loginUserController = async(req: Request, res: Response) => {
  console.log('req', req.body);
  const { login, password } = req.body;
  console.log('username, password', login, password)

  try {
    const user: User | null = await findUserByLogin(login);
    if (!user) {
      res.status(409).json('Такого username нет')
      return
    }

    const isPasswordTrue = await bcrypt.compare(password, user.password_hash)

    if(!isPasswordTrue) {
      res.status(500).json('Иди нахуй пацан, не тот пароль')
      return
    }

    //Если есть сгенерировать токены и записать в куки

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie('accessToken', accessToken,
      {
        httpOnly: true,
        path: '/',
        domain: 'localhost',
        sameSite: 'strict',
        // signed: true
      }
    )
    res.cookie('refreshToken', refreshToken,
      {
        httpOnly: true,
        path: '/',
        domain: 'localhost',
        sameSite: 'strict',
        // signed: true
      }
    )



    res.cookie('keka', (Math.random() * 100).toString(),
      {
        httpOnly: false,
        path: '/',
        domain: 'localhost',
        sameSite: 'strict',
        // signed: true
      }
    )

      res.status(200).json('coll')
    // console.log('req.cookies', req.cookies)
    // console.log('req.cookies', req.cookies.keka)
    // console.log('accessToken', req.cookies.accessToken)
    // const test = verifyAccessToken(req.cookies.accessToken)
    // console.log('verifyAccessToken', test)
    return

    // console.log('accessToken', accessToken)
    // console.log('refreshToken', refreshToken)


    const date = new Date().getDate() + 7 * 24 * 60 * 60 * 1000


    // если токена нет
    // await setRefreshToken(user.id, '123124', date)

    // найти рефреш токер
    //const token: RefreshTableItem = await findRefreshToken('123124')

    //инвалидировать токен
    // await invalidateRefreshToken('123124')


  } catch (e) {
    console.log(e)
    //error get user
  }



  //считать данные
  //Проверить есть ли такое в бд
  //Если есть сгенерировать токены и записать в куки
  //Если нет, вернуть ошибку


}