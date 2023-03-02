"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var authValidator = {
    validateRegisterUser: function () {
        return [
            (0, express_validator_1.check)("email").isEmail().not().isEmpty(),
            (0, express_validator_1.check)("password").not().isEmpty().trim().escape().isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
            (0, express_validator_1.check)("phone").isMobilePhone("vi-VN").not().isEmpty(),
        ];
    },
    validatorLogin: function () {
        return [
            (0, express_validator_1.check)("email").isEmail(),
            (0, express_validator_1.check)("password").not().isEmpty().trim().escape().isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
        ];
    },
};
exports.default = authValidator;
//# sourceMappingURL=authValidator.js.map