import accountRepository from "./../repositories/Account.repository";

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

  register: () => {},
};

export default authService;
