"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();
var generateAccessToken = function (role, id) {
    var token = jwt.sign({ role: role, id: id }, process.env.TOKEN_SECRET);
    return token;
};
exports.default = generateAccessToken;
//# sourceMappingURL=token.js.map