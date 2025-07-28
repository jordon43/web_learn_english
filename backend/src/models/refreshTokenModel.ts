import {pool} from "../../db.js";
import {RefreshTableItem, RefreshTableItemSchema} from "../types/Refresh.js";


export const setRefreshToken = async(userId: number, token: string, expiresAt: Date): Promise<void> => {
  await pool.query(`
    insert into refresh_tokens (user_id, token, expires_at) 
    values ($1, $2, $3)
  `, [userId, token, expiresAt]
  );
}

export const invalidateRefreshToken = async(token: string): Promise<void> => {
  await pool.query(`
    update refresh_tokens set is_valid = false 
    where token = $1
  `, [token]
  );
}

export const findRefreshToken = async(token: string): Promise<RefreshTableItem> => {
  const result = await pool.query(`
    select * from refresh_tokens 
    where token = $1 and is_valid = true
  `, [token]
  );

  const parsedToken = RefreshTableItemSchema.safeParse(result.rows[0])
  if (parsedToken.error) throw parsedToken.error

  return parsedToken.data
}


export const getRefreshToken = async (): Promise<RefreshTableItem> => {

}