import accountRepository from "./../repositories/Account.repository";

import * as bcrypt from "bcrypt";

const authService = {
  login: async (email: string, password: string) => {
    if (await accountRepository.getEmailAccount(email)) {
      console.log("account ok");
      if (await accountRepository.getPassword(password)) {
        console.log("password ok");
        return true;
      }
    }
    console.log("Khong dc");
    return false;
  },

  register: (email: string, password: string) => {},
};

export default authService;
