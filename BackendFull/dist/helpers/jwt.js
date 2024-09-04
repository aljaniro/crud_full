"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const label_1 = __importDefault(require("../label"));
const jwt = require("jsonwebtoken");
const getJwt = (uid, role) => {
    try {
        return new Promise((resolve, reject) => {
            const payload = { uid, role };
            jwt.sign(payload, process.env.SECRET_KEY || '', {
                expiresIn: '24h'
            }, (error, token) => {
                if (error) {
                    console.error(error);
                    reject(label_1.default.ERROR_TOKEN);
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    catch (error) {
        console.error(error);
        throw new Error(label_1.default.ERROR);
    }
};
exports.default = getJwt;
//# sourceMappingURL=jwt.js.map