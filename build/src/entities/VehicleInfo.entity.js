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
exports.VehicleInfo = void 0;
var typeorm_1 = require("typeorm");
var VehicleType_entity_1 = require("./VehicleType.entity");
var Driver_entity_1 = require("./Driver.entity");
var VehicleInfo = /** @class */ (function () {
    function VehicleInfo() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], VehicleInfo.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], VehicleInfo.prototype, "vehicleName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], VehicleInfo.prototype, "vehicleColor", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], VehicleInfo.prototype, "licensePlates", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Driver_entity_1.Driver; }, function (driver) { return driver.vehicle; }),
        __metadata("design:type", Driver_entity_1.Driver)
    ], VehicleInfo.prototype, "driver", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return VehicleType_entity_1.VehicleType; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", VehicleType_entity_1.VehicleType)
    ], VehicleInfo.prototype, "vehicleType", void 0);
    VehicleInfo = __decorate([
        (0, typeorm_1.Entity)()
    ], VehicleInfo);
    return VehicleInfo;
}());
exports.VehicleInfo = VehicleInfo;
//# sourceMappingURL=VehicleInfo.entity.js.map