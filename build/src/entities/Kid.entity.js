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
exports.Kid = void 0;
var typeorm_1 = require("typeorm");
var Enum_1 = require("../utils/Enum");
var User_entity_1 = require("./User.entity");
var Booking_entity_1 = require("./Booking.entity");
var Kid = /** @class */ (function () {
    function Kid() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Kid.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
        }),
        __metadata("design:type", String)
    ], Kid.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "integer",
        }),
        __metadata("design:type", Number)
    ], Kid.prototype, "age", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Enum_1.Gender, default: Enum_1.Gender.male }),
        __metadata("design:type", String)
    ], Kid.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "varchar",
            default: "https://the-hills.s3.ap-northeast-1.amazonaws.com/kid/avatar.png",
        }),
        __metadata("design:type", String)
    ], Kid.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_entity_1.User; }, function (user) { return user.kid; }, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        }),
        __metadata("design:type", User_entity_1.User)
    ], Kid.prototype, "parent", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Booking_entity_1.Booking; }, function (booking) { return booking.kid; }),
        __metadata("design:type", Array)
    ], Kid.prototype, "booking", void 0);
    Kid = __decorate([
        (0, typeorm_1.Entity)()
    ], Kid);
    return Kid;
}());
exports.Kid = Kid;
//# sourceMappingURL=Kid.entity.js.map