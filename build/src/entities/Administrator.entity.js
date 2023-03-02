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
exports.Administrator = void 0;
var typeorm_1 = require("typeorm");
var Account_entity_1 = require("./Account.entity");
var Administrator = /** @class */ (function () {
    function Administrator() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Administrator.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Administrator.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Account_entity_1.Account; }, function (account) { return account.admin; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Account_entity_1.Account)
    ], Administrator.prototype, "account", void 0);
    Administrator = __decorate([
        (0, typeorm_1.Entity)()
    ], Administrator);
    return Administrator;
}());
exports.Administrator = Administrator;
//# sourceMappingURL=Administrator.entity.js.map