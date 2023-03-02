"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Auth_controller_1 = require("../controllers/Auth.controller");
var authValidator_1 = require("./../validator/authValidator");
var authRouter = (0, express_1.Router)();
authRouter.get("/", Auth_controller_1.default.allAccount);
authRouter.post("/login", authValidator_1.default.validatorLogin(), Auth_controller_1.default.login);
authRouter.post("/register", authValidator_1.default.validateRegisterUser(), Auth_controller_1.default.register);
authRouter.post("/register/driver", Auth_controller_1.default.driverRigester);
authRouter.post("/login/driver", Auth_controller_1.default.driverLogin);
authRouter.post("/register/admin", Auth_controller_1.default.adminRegister);
authRouter.post("/login/admin", Auth_controller_1.default.adminLogin);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map