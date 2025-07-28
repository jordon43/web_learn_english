import {pool} from "../../db.js";
import {User, UserSchema} from "../types/User.js";


export const findUserByLogin = async (login: string): Promise<User | null> => {
  const result = await pool.query(`select * from users where username = $1`, [login])
  const user =  result.rows[0]
  if (!user) return null

  const parsed = UserSchema.safeParse(user)

  if (!parsed.success) {
    throw new Error('User object is invalid: ' + JSON.stringify(parsed.error.format()));
  }

  return parsed.data
}

export const setUser = async (dataUser: Omit<User, "id">): Promise<void> => {
  const result = await pool.query(`
    INSERT INTO users (username, password_hash) 
    VALUES ($1, $2)
  `, [dataUser.username, dataUser.password_hash]);

  console.log('Inserted user:', dataUser.username);
};