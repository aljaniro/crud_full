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
exports.typeConexion = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const items_model_1 = __importDefault(require("../models/items.model"));
const login_model_1 = __importDefault(require("../models/login.model"));
const personas_model_1 = __importDefault(require("../models/personas.model"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: 3306,
    username: 'root',
    password: '',
    database: 'empleado',
    synchronize: false,
    logging: true,
    entities: [items_model_1.default, login_model_1.default, personas_model_1.default],
});
const typeConexion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        exports.AppDataSource.initialize();
        console.log("BASE DE DATOS CONECTADA POR TYPEORM");
    }
    catch (error) {
        console.log(error);
    }
});
exports.typeConexion = typeConexion;
/*
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })*/ 
//# sourceMappingURL=typeorm.js.map