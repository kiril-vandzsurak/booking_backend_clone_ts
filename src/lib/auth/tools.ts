import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface TokenPayload {
  _id: string;
  role: "Guest" | "Host";
}

export const createAccessToken = (payload: TokenPayload): Promise<string> =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_KEY!,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token as string);
      }
    )
  );

export const verifyAccessToken = (token: string): Promise<TokenPayload> =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_KEY!, (err, originalPayload) => {
      if (err) reject(err);
      else resolve(originalPayload as TokenPayload);
    })
  );
