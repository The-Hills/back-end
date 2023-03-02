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
var Account_repository_1 = require("./../repositories/Account.repository");
var bcrypt = require("bcrypt");
var User_repository_1 = require("./../repositories/User.repository");
var token_1 = require("./../middlewares/token");
var Driver_repository_1 = require("./../repositories/Driver.repository");
var Admin_repository_1 = require("./../repositories/Admin.repository");
var authService = {
    login: function (paylod) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, account, passwordCompare, id, role, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = paylod.email, password = paylod.password;
                    return [4 /*yield*/, Account_repository_1.default.exitsEmail(email)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, Account_repository_1.default.getAccountByEmail(email)];
                case 2:
                    account = _a.sent();
                    if (!(account.type === "user")) return [3 /*break*/, 4];
                    return [4 /*yield*/, bcrypt.compare(password, account === null || account === void 0 ? void 0 : account.password)];
                case 3:
                    passwordCompare = _a.sent();
                    if (passwordCompare) {
                        id = account.user.id;
                        role = account.type;
                        token = (0, token_1.default)(account.type, id);
                        return [2 /*return*/, { token: token, id: id, role: role }];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, false];
                case 5: return [2 /*return*/, null];
            }
        });
    }); },
    register: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, phone, name, gender, role, emailIsExits, hashedPassword, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = payload.email, password = payload.password, phone = payload.phone, name = payload.name, gender = payload.gender, role = payload.role;
                    return [4 /*yield*/, Account_repository_1.default.exitsEmail(email)];
                case 1:
                    emailIsExits = _a.sent();
                    if (!!emailIsExits) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, Account_repository_1.default.createAccount(email, hashedPassword, role)];
                case 3:
                    acc = _a.sent();
                    return [4 /*yield*/, User_repository_1.default.createUser(name, phone, gender, acc)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: return [2 /*return*/, false];
            }
        });
    }); },
    driverRegister: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, role, name, phone, gender, avatar, cardId, driverLicense, emailIsExits, hashedPassword, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = payload.email, password = payload.password, role = payload.role, name = payload.name, phone = payload.phone, gender = payload.gender, avatar = payload.avatar, cardId = payload.cardId, driverLicense = payload.driverLicense;
                    return [4 /*yield*/, Account_repository_1.default.exitsEmail(email)];
                case 1:
                    emailIsExits = _a.sent();
                    if (!!emailIsExits) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, Account_repository_1.default.createAccount(email, hashedPassword, role)];
                case 3:
                    acc = _a.sent();
                    return [4 /*yield*/, Driver_repository_1.default.createDriver(name, phone, gender, avatar, cardId, driverLicense, acc)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: return [2 /*return*/, false];
            }
        });
    }); },
    driverLogin: function (paylod) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, account, passwordCompare, id, role, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = paylod.email, password = paylod.password;
                    return [4 /*yield*/, Account_repository_1.default.exitsEmail(email)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, Account_repository_1.default.getAccountByEmail(email)];
                case 2:
                    account = _a.sent();
                    if (!(account.type === "driver")) return [3 /*break*/, 4];
                    if (!account.driver.isVerify) return [3 /*break*/, 4];
                    return [4 /*yield*/, bcrypt.compare(password, account === null || account === void 0 ? void 0 : account.password)];
                case 3:
                    passwordCompare = _a.sent();
                    if (passwordCompare) {
                        id = account.driver.id;
                        role = account.type;
                        token = (0, token_1.default)(account.type, id);
                        return [2 /*return*/, { token: token, id: id, role: role }];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, false];
                case 5: return [2 /*return*/, null];
            }
        });
    }); },
    adminRegister: function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, role, name, emailIsExits, hashedPassword, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = payload.email, password = payload.password, role = payload.role, name = payload.name;
                    return [4 /*yield*/, Account_repository_1.default.exitsEmail(email)];
                case 1:
                    emailIsExits = _a.sent();
                    if (!!emailIsExits) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, Account_repository_1.default.createAccount(email, hashedPassword, role)];
                case 3:
                    acc = _a.sent();
                    return [4 /*yield*/, Admin_repository_1.default.create(name, acc)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: return [2 /*return*/, false];
            }
        });
    }); },
    adminLogin: function (paylod) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, account, passwordCompare, id, role, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = paylod.email, password = paylod.password;
                    return [4 /*yield*/, Account_repository_1.default.exitsEmail(email)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 5];
                    return [4 /*yield*/, Account_repository_1.default.getAccountByEmail(email)];
                case 2:
                    account = _a.sent();
                    if (!(account.type === "admin")) return [3 /*break*/, 4];
                    return [4 /*yield*/, bcrypt.compare(password, account === null || account === void 0 ? void 0 : account.password)];
                case 3:
                    passwordCompare = _a.sent();
                    if (passwordCompare) {
                        id = account.admin.id;
                        role = account.type;
                        token = (0, token_1.default)(account.type, id);
                        return [2 /*return*/, { token: token, id: id, role: role }];
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, false];
                case 5: return [2 /*return*/, null];
            }
        });
    }); },
    logout: function () { },
};
exports.default = authService;
//# sourceMappingURL=auth.service.js.map