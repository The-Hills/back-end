import { AccountType, Gender } from "./Enum";

export interface RegisterUserPayload {
  email: string;
  phone: string;
  password: string;
  name: string;
  gender: Gender;
  avatar: string;
  role: AccountType;
}


