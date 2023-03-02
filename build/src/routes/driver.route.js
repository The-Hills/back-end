"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Driver_controller_1 = require("../controllers/Driver.controller");
var driverRouter = express.Router();
driverRouter.put("/:id", Driver_controller_1.default.update);
driverRouter.delete("/:id", Driver_controller_1.default.destroy);
driverRouter.get("/:id", Driver_controller_1.default.show);
driverRouter.get("/", Driver_controller_1.default.index);
exports.default = driverRouter;
//# sourceMappingURL=driver.route.js.map