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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_connection = exports.db = void 0;
const promise_1 = require("mysql2/promise");
exports.db = (0, promise_1.createPool)({
    host: process.env.HOST,
    user: 'root',
    password: '',
    database: process.env.DATABASE
});
const db_connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.db.getConnection();
        console.log("BASE DE DATOS CONECTADA");
    }
    catch (error) {
        console.log(error);
    }
});
exports.db_connection = db_connection;
//# sourceMappingURL=mysql.js.map