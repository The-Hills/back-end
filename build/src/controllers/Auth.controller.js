"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = require("./../services/auth.service");
var Account_repository_1 = require("./../repositories/Account.repository");
var express_validator_1 = require("express-validator");
var Enum_1 = require("../utils/Enum");
var authController = {
    allAccount: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var listAcc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Account_repository_1.default.getAllAccount()];
                case 1:
                    listAcc = _a.sent();
                    if (listAcc.length !== 0) {
                        res.status(200).json({ message: "Successfully", data: listAcc });
                    }
                    else {
                        res.status(200).json({ message: "List Empty", data: [] });
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, data, result, token, id, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("login");
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    }
                    data = req.body;
                    return [4 /*yield*/, auth_service_1.default.login(data)];
                case 1:
                    result = _a.sent();
                    if (result === null) {
                        res
                            .status(401)
                            .json({ message: "Authentication failed. User not found." });
                    }
                    else if (!result) {
                        res
                            .status(401)
                            .json({ message: "Authentication failed. Wrong password." });
                    }
                    else {
                        token = result.token, id = result.id, role = result.role;
                        res.status(200).json({
                            message: "Successfully",
                            token: token,
                            id: id,
                            role: role,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    register: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, data, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    }
                    data = req.body;
                    return [4 /*yield*/, auth_service_1.default.register(data)];
                case 1:
                    acc = _a.sent();
                    if (!acc) {
                        return [2 /*return*/, res.status(500).json({ message: "Email is exits" })];
                    }
                    res.status(200).json({ message: "Successfully", data: acc });
                    return [2 /*return*/];
            }
        });
    }); },
    driverRigester: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, data, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = (0, express_validator_1.validationResult)(req);
                    if (!errors.isEmpty()) {
                        return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                    }
                    data = req.body;
                    data.role = Enum_1.AccountType.driver;
                    return [4 /*yield*/, auth_service_1.default.driverRegister(data)];
                case 1:
                    acc = _a.sent();
                    if (!acc) {
                        return [2 /*return*/, res.status(500).json({ message: "Email is exits" })];
                    }
                    res.status(200).json({ message: "Successfully", data: acc });
                    return [2 /*return*/];
            }
        });
    }); },
    driverLogin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data, result, token, id, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = req.body;
                    return [4 /*yield*/, auth_service_1.default.driverLogin(data)];
                case 1:
                    result = _a.sent();
                    if (result === null) {
                        res
                            .status(401)
                            .json({ message: "Authentication failed. User not found." });
                    }
                    else if (!result) {
                        res
                            .status(401)
                            .json({ message: "Authentication failed. Wrong password." });
                    }
                    else {
                        token = result.token, id = result.id, role = result.role;
                        res.status(200).json({
                            message: "Successfully",
                            token: token,
                            id: id,
                            role: role,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    adminRegister: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = req.body;
                    console.log(data);
                    data.role = Enum_1.AccountType.admin;
                    return [4 /*yield*/, auth_service_1.default.adminRegister(data)];
                case 1:
                    acc = _a.sent();
                    if (!acc) {
                        return [2 /*return*/, res.status(500).json({ message: "Email is exits" })];
                    }
                    res.status(200).json({ message: "Successfully", data: acc });
                    return [2 /*return*/];
            }
        });
    }); },
    adminLogin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var data, result, token, id, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = req.body;
                    return [4 /*yield*/, auth_service_1.default.adminLogin(data)];
                case 1:
                    result = _a.sent();
                    if (result === null) {
                        res
                            .status(401)
                            .json({ message: "Authentication failed. User not found." });
                    }
                    else if (!result) {
                        res
                            .status(401)
                            .json({ message: "Authentication failed. Wrong password." });
                    }
                    else {
                        token = result.token, id = result.id, role = result.role;
                        console.log(token);
                        res.status(200).json({
                            message: "Successfully",
                            token: token,
                            id: id,
                            role: role,
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); },
};
exports.default = authController;
//# sourceMappingURL=Auth.controller.js.map