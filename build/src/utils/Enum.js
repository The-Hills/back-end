"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverStatus = exports.BookingStatus = exports.AccountType = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
    Gender["other"] = "other";
})(Gender = exports.Gender || (exports.Gender = {}));
var AccountType;
(function (AccountType) {
    AccountType["user"] = "user";
    AccountType["driver"] = "driver";
    AccountType["admin"] = "admin";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["onTracking"] = "onTracking";
    BookingStatus["onRide"] = "onRide";
    BookingStatus["conpleted"] = "completed";
})(BookingStatus = exports.BookingStatus || (exports.BookingStatus = {}));
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["active"] = "active";
    DriverStatus["unActive"] = "unActive";
})(DriverStatus = exports.DriverStatus || (exports.DriverStatus = {}));
//# sourceMappingURL=Enum.js.map