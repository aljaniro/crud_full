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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const label_1 = __importDefault(require("../label"));
const login_model_1 = __importDefault(require("../models/login.model"));
const jwtoken = require('jsonwebtoken');
const validateJwt = (rolevalidate) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            const token2 = req.cookies.auth;
            console.log(typeof token2);
            console.log("este es otro", token2);
            console.log("este es tu token", token);
            if (!token || token == undefined) {
                return res.status(401).json({
                    msg: "IDENTIFIQUESE PRIMERO",
                    error: label_1.default.NO_VALIDATE
                });
            }
            const data = jwtoken.verify(token, process.env.SECRET_KEY || '');
            console.log("su id", data);
            const user = yield login_model_1.default.findOne({ where: { id: data.id } });
            console.log("usuario", user);
            if (!user) {
                return res.status(401).json({
                    msg: label_1.default.MSG_400,
                });
            }
            if (!user.status) {
                return res.status(401).json({
                    msg: label_1.default.MSG_400,
                });
            }
            console.log(user.role, rolevalidate);
            if (user.role !== rolevalidate) {
                console.log("no funciona");
                return res.status(401).json({
                    msg: label_1.default.ROLE_VALIDATE,
                    role: user.role
                });
            }
            console.log(user);
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                msg: label_1.default.MSG_500,
                response: label_1.default.ERROR
            });
        }
    });
};
exports.default = validateJwt;
//# sourceMappingURL=validateJWT.js.map