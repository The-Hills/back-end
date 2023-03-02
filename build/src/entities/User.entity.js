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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Enum_1 = require("../utils/Enum");
var Kid_entity_1 = require("./Kid.entity");
var Account_entity_1 = require("./Account.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: Enum_1.Gender, default: Enum_1.Gender.male }),
        __metadata("design:type", String)
    ], User.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: "avatar.png",
        }),
        __metadata("design:type", String)
    ], User.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Account_entity_1.Account; }, function (account) { return account.user; }, { onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Account_entity_1.Account)
    ], User.prototype, "account", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Kid_entity_1.Kid; }, function (kid) { return kid.parent; }, {
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], User.prototype, "kid", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.entity.js.map