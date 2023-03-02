"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Kid_controller_1 = require("./../controllers/Kid.controller");
var kidRouter = (0, express_1.Router)();
kidRouter.get("/:id", Kid_controller_1.default.show);
kidRouter.post("/", Kid_controller_1.default.store);
kidRouter.delete("/:id", Kid_controller_1.default.destroy);
kidRouter.get("/", Kid_controller_1.default.index);
exports.default = kidRouter;
//# sourceMappingURL=kid.route.js.map