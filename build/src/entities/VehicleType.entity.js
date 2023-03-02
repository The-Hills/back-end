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
exports.VehicleType = void 0;
var typeorm_1 = require("typeorm");
var VehicleInfo_entity_1 = require("./VehicleInfo.entity");
var VehicleType = /** @class */ (function () {
    function VehicleType() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], VehicleType.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], VehicleType.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "int",
        }),
        __metadata("design:type", Number)
    ], VehicleType.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return VehicleInfo_entity_1.VehicleInfo; }, function (vehicleInfo) { return vehicleInfo.vehicleType; }),
        __metadata("design:type", VehicleInfo_entity_1.VehicleInfo)
    ], VehicleType.prototype, "vehicleInfo", void 0);
    VehicleType = __decorate([
        (0, typeorm_1.Entity)()
    ], VehicleType);
    return VehicleType;
}());
exports.VehicleType = VehicleType;
//# sourceMappingURL=VehicleType.entity.js.map