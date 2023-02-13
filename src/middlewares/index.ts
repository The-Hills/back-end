import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const getUserFromToken = (token) => {
  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decode);
    return decode.account;
  } catch (error) {
    throw error;
  }
};

const setCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const account = getUserFromToken(token);
  req.account = account;
  return next();
};

export default setCurrentUser;
