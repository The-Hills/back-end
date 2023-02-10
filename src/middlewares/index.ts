import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import accountRepository from "./../repositories/Account.repository";

dotenv.config();

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.status(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err: any, decode) => {
    if (err) return res.status(403);
    const account = accountRepository.getAccountById(decode.accountId);
    if (account === null) return res.status(401);
    next();
  });
};

export default authenticateToken;
