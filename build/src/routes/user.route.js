"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_controller_1 = require("./../controllers/User.controller");
var userRouter = (0, express_1.Router)();
userRouter.delete("/:id", User_controller_1.default.destroy);
userRouter.get("/:id", User_controller_1.default.show);
userRouter.put("/:id", User_controller_1.default.update);
userRouter.get("/", User_controller_1.default.index);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map