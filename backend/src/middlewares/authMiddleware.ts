import {Response, Request, NextFunction} from 'express'
import {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken} from "../utils/jwt.js";
import {logger} from "../utils/logger.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  logger.info('AUTH CHECK MIDDLEWARE START');
  const accessToken = req?.cookies?.['accessToken']
  const refreshToken = req?.cookies?.['refreshToken']
  try {
    logger.info('Check accessToken');
    const dataUser = verifyAccessToken(accessToken);
    logger.info(`AccessToken is TRUE, data user: ${dataUser.username}`);
    next();
  }
  catch (e) {
    logger.info(`AccessToken is no valid or poddelka`);
    try {
      logger.info(`Check REFRESH token on valid`);
      const dataUser: any = verifyRefreshToken(refreshToken)
      logger.info(`Check REFRESH token is valid`);
      logger.info(`Generate new _ tokens`);
      const newAccessToken = generateAccessToken({
        id: dataUser.id,
        username: dataUser.username,
        password_hash:  dataUser.password_hash,
      })
      const newRefreshToken = generateRefreshToken({
        id: dataUser.id,
        username: dataUser.username,
        password_hash:  dataUser.password_hash,
      })

      logger.info(`Write new tokens in cookie`);

      res.cookie('accessToken', newAccessToken,
        {
          httpOnly: true,
          path: '/',
          domain: 'localhost',
          sameSite: 'strict',
          // signed: true
        }
      )
      res.cookie('refreshToken', newRefreshToken,
        {
          httpOnly: true,
          path: '/',
          domain: 'localhost',
          sameSite: 'strict',
          // signed: true
        }
      )
      next();
    } catch (e) {
      logger.info(`ERROR 400 tokens is no valid`);
      res.status(401).json('ты кто бля такой')
    }
  }
  logger.info('AUTH CHECK MIDDLEWARE END');
}