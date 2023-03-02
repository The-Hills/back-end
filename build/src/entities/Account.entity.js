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
exports.Account = void 0;
var typeorm_1 = require("typeorm");
var Enum_1 = require("../utils/Enum");
var User_entity_1 = require("./User.entity");
var Driver_entity_1 = require("./Driver.entity");
var Administrator_entity_1 = require("./Administrator.entity");
var Account = /** @class */ (function () {
    function Account() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Account.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: Enum_1.AccountType,
            default: Enum_1.AccountType.user,
        }),
        __metadata("design:type", String)
    ], Account.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Account.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Account.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return User_entity_1.User; }, function (user) { return user.account; }),
        __metadata("design:type", User_entity_1.User)
    ], Account.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Driver_entity_1.Driver; }, function (driver) { return driver.account; }),
        __metadata("design:type", Driver_entity_1.Driver)
    ], Account.prototype, "driver", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Administrator_entity_1.Administrator; }, function (admin) { return admin.account; }),
        __metadata("design:type", Administrator_entity_1.Administrator)
    ], Account.prototype, "admin", void 0);
    Account = __decorate([
        (0, typeorm_1.Entity)()
    ], Account);
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=Account.entity.js.map