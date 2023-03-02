"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Booking_controller_1 = require("./../controllers/Booking.controller");
var bookingRouter = (0, express_1.Router)();
bookingRouter.post("/acceptbooking/:id", Booking_controller_1.default.accpect);
bookingRouter.post("/completedbooking/:id", Booking_controller_1.default.completed);
bookingRouter.post("/", Booking_controller_1.default.store);
bookingRouter.get("/", Booking_controller_1.default.index);
exports.default = bookingRouter;
//# sourceMappingURL=booking.route.js.map