import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (accountId: string) => {
  const token = jwt.sign({ accountId }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
  return token;
};

export default generateAccessToken;
