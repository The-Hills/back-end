"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
var typeorm_1 = require("typeorm");
var Enum_1 = require("../utils/Enum");
var Account_entity_1 = require("./Account.entity");
var Booking_entity_1 = require("./Booking.entity");
var VehicleInfo_entity_1 = require("./VehicleInfo.entity");
var Driver = /** @class */ (function () {
    function Driver() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Driver.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Driver.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Driver.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Driver.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: Enum_1.DriverStatus,
            default: Enum_1.DriverStatus.unActive,
        }),
        __metadata("design:type", String)
    ], Driver.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: "avatar.png",
        }),
        __metadata("design:type", String)
    ], Driver.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Driver.prototype, "rating", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Driver.prototype, "cardId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Driver.prototype, "driverLicense", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], Driver.prototype, "isVerify", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "point",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Driver.prototype, "currentLocation", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Account_entity_1.Account; }, function (account) { return account.driver; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Account_entity_1.Account)
    ], Driver.prototype, "account", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return VehicleInfo_entity_1.VehicleInfo; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", VehicleInfo_entity_1.VehicleInfo)
    ], Driver.prototype, "vehicle", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Booking_entity_1.Booking; }, function (booking) { return booking.driver; }),
        __metadata("design:type", Array)
    ], Driver.prototype, "booking", void 0);
    Driver = __decorate([
        (0, typeorm_1.Entity)()
    ], Driver);
    return Driver;
}());
exports.Driver = Driver;
//# sourceMappingURL=Driver.entity.js.map