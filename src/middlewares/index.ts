import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const getUserFromToken = async (token) => {
  const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
  return decode.account;
};

const setCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token === undefined) {
    return next({ status: 401, message: "missing auth token" });
  }
  const account = await getUserFromToken(token);
  req.account = account;
  return next();
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.account) {
    return next();
  }
  return next({ code: 401, message: "Unauthorized" });
};

export default setCurrentUser;
