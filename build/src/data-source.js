"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_entity_1 = require("./entities/User.entity");
var Kid_entity_1 = require("./entities/Kid.entity");
var Booking_entity_1 = require("./entities/Booking.entity");
var Driver_entity_1 = require("./entities/Driver.entity");
var VehicleInfo_entity_1 = require("./entities/VehicleInfo.entity");
var VehicleType_entity_1 = require("./entities/VehicleType.entity");
var Payment_entity_1 = require("./entities/Payment.entity");
var Administrator_entity_1 = require("./entities/Administrator.entity");
var Account_entity_1 = require("./entities/Account.entity");
var dotenv = require("dotenv");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        User_entity_1.User,
        Kid_entity_1.Kid,
        Booking_entity_1.Booking,
        Driver_entity_1.Driver,
        VehicleInfo_entity_1.VehicleInfo,
        VehicleType_entity_1.VehicleType,
        Payment_entity_1.Payment,
        Administrator_entity_1.Administrator,
        Account_entity_1.Account,
    ],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map