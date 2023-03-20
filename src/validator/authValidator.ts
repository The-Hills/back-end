import { check } from "express-validator";

const authValidator = {
  validateRegisterUser: () => {
    return [
      check("email").isEmail().not().isEmpty(),
      check("password").not().isEmpty().trim().escape().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
      check("phone").isMobilePhone("vi-VN").not().isEmpty(),
    ];
  },

  validatorLoginUser: () => {
    return [
      check("email").isEmail(),
      check("password").not().isEmpty().trim().escape().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    ];
  },
};

export default authValidator;
