"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (!authHeader) {
        return res.status(403).send('Token requerido');
    }
    const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"
    console.log(token);
    if (!token) {
        return res.status(403).send('Token requerido');
    }
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '');
        console.log("su id", data);
        if (!data) {
            return res.status(401).json({
                msg: "no valido su token",
                isValid: false
            });
        }
        res.status(200).send(true);
    }
    catch (err) {
        return res.status(401).json({
            msg: "no valido su token",
            isValid: false
        });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=validateToken.js.map