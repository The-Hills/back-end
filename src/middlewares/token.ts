import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Account } from "./../entities/Account.entity";

dotenv.config();

const generateAccessToken = (account: Account) => {
  const token = jwt.sign({ account }, process.env.TOKEN_SECRET);
  return token;
};

export default generateAccessToken;
