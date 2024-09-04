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
const express_1 = __importDefault(require("express"));
const label_1 = __importDefault(require("../label"));
const typeorm_1 = require("../config/typeorm");
const item_1 = require("../routes/item");
const person_routes_1 = require("../routes/person.routes");
const login_routes_1 = __importDefault(require("../routes/login.routes"));
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.login_path = "/api";
        this.conexion();
        this.middlewares();
        this.morgan();
        this.json();
        this.cookie();
        this.rutas();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(label_1.default.LISTEN_SERVER + this.port);
        });
    }
    morgan() {
        this.app.use(morgan('dev'));
    }
    conexion() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.typeConexion)();
        });
    }
    cookie() {
        this.app.use(cookieParser());
    }
    rutalogin() {
        this.app.use(this.login_path, login_routes_1.default);
    }
    rutas() {
        this.app.use(this.login_path, login_routes_1.default);
        this.app.use(item_1.ruta);
        this.app.use(person_routes_1.rutas);
    }
    middlewares() {
        const allowedOrigin = process.env.allowedOrigins || '';
        this.app.use(cors({ allowedOrigin }));
        this.app.use(express_1.default.json());
    }
    json() {
        this.app.use(express_1.default.json());
    }
}
exports.default = Server;
//# sourceMappingURL=server.model.js.map