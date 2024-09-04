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
exports.validateform = void 0;
const label_1 = __importDefault(require("../label"));
const validateform = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("holllla");
        const { username, password, role, status } = req.body;
        console.log(username);
        console.log(username, password, role, status);
        if (username.length < 3 || username.length > 20) {
            console.log("errrrrror");
            return res.status(401).send("CANTIDAD DE CARACTERES DEBE ESTAR ENTRE 3 Y 20");
        }
        if (password.length < 3 || password.length > 10) {
            console.log("errrrrror");
            return res.status(401).send("CANTIDAD DE CARACTERES DEL PASSWORD DEBE ESTAR ENTRE 3 Y 8");
        }
        if (role == undefined) {
        }
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
exports.validateform = validateform;
//# sourceMappingURL=validate.js.map