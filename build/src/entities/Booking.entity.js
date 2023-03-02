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
exports.Booking = void 0;
var typeorm_1 = require("typeorm");
var Enum_1 = require("../utils/Enum");
var Driver_entity_1 = require("./Driver.entity");
var Payment_entity_1 = require("./Payment.entity");
var Kid_entity_1 = require("./Kid.entity");
var Booking = /** @class */ (function () {
    function Booking() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Booking.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Booking.prototype, "distance", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Booking.prototype, "fee", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: Enum_1.BookingStatus,
            default: Enum_1.BookingStatus.onTracking,
        }),
        __metadata("design:type", String)
    ], Booking.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            nullable: false,
        }),
        __metadata("design:type", Date)
    ], Booking.prototype, "startTime", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP"; },
            nullable: false,
            onUpdate: "CURRENT_TIMESTAMP",
        }),
        __metadata("design:type", Date)
    ], Booking.prototype, "endTime", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "point",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Booking.prototype, "startLocation", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "point",
            nullable: true,
        }),
        __metadata("design:type", String)
    ], Booking.prototype, "endLocation", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Payment_entity_1.Payment; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Payment_entity_1.Payment)
    ], Booking.prototype, "payment", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Driver_entity_1.Driver; }, function (driver) { return driver.booking; }),
        __metadata("design:type", Driver_entity_1.Driver)
    ], Booking.prototype, "driver", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Kid_entity_1.Kid; }, function (kid) { return kid.booking; }),
        __metadata("design:type", Kid_entity_1.Kid)
    ], Booking.prototype, "kid", void 0);
    Booking = __decorate([
        (0, typeorm_1.Entity)()
    ], Booking);
    return Booking;
}());
exports.Booking = Booking;
//# sourceMappingURL=Booking.entity.js.map