"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureAuth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secureAuth = function (req, res, next) {
    try {
        var token = req.headers.authorization.split(" ")[1];
        var id = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET).id;
        req.userId = id;
        next();
    }
    catch (error) {
        // console.log(error);
        res.status(400).json({ message: error.message });
    }
};
exports.secureAuth = secureAuth;
