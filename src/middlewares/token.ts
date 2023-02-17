import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { AccountType } from "../utils/Enum";

dotenv.config();

const generateAccessToken = (role: AccountType, id: string) => {
  const token = jwt.sign({ role, id }, process.env.TOKEN_SECRET);
  return token;
};

export default generateAccessToken;
