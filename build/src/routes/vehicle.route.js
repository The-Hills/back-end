"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Vehicle_controller_1 = require("./../controllers/Vehicle.controller");
var vehicleRouter = (0, express_1.Router)();
vehicleRouter.post("/", Vehicle_controller_1.default.store);
vehicleRouter.post("/getprice", Vehicle_controller_1.default.getPrice);
vehicleRouter.get("/", Vehicle_controller_1.default.index);
exports.default = vehicleRouter;
//# sourceMappingURL=vehicle.route.js.map