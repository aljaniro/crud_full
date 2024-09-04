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
exports.deleteItem = exports.updateItem = exports.getuser = exports.createItem = exports.getItems = exports.getItem = exports.register = void 0;
const login_model_1 = __importDefault(require("../models/login.model"));
const items_model_1 = __importDefault(require("../models/items.model"));
const label_1 = __importDefault(require("../label"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
var bcrypt = require("bcryptjs");
const getuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const data = yield login_model_1.default.findOneBy({
            username: username,
        });
        console.log(data);
        if (!data) {
            return res.status(400).json({
                msg: label_1.default.MSG_400,
                response: label_1.default.FAILED_LOGIN,
            });
        }
        console.log(data.status);
        if (!data.status) {
            return res.status(400).json({
                msg: label_1.default.MSG_400,
                response: label_1.default.STATUS_USER,
            });
        }
        const validpass = bcrypt.compareSync(password, data.password);
        if (!validpass) {
            return res.status(400).json({
                msg: label_1.default.MSG_400,
                response: label_1.default.FAILED_LOGIN,
            });
        }
        const token = yield (0, jwt_1.default)(String(data.id), String(data.role));
        console.log(data);
        res.cookie("auth", token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
        });
        res.status(200).json({
            msg: label_1.default.SUCCESFUL_LOGIN,
            username: data.username,
            isSuccess: true,
            token: token,
            expiresIn: 3600,
            response: data,
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).send(error.message);
    }
});
exports.getuser = getuser;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hola");
        const { username, password, role, status } = req.body;
        const salt = yield bcrypt.genSaltSync();
        const hashpas = yield bcrypt.hashSync(password, salt);
        const data = yield login_model_1.default.save({
            username: username,
            password: hashpas,
            role: role,
            status: status,
        });
        res.status(200).json({
            msj: "CREADO CON EXITO",
            data: data,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("error no hay");
            res.status(500).send(error.message);
        }
    }
});
exports.register = register;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield items_model_1.default.find();
        res.status(200).json(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("error no hay");
            res.status(500).send(error.message);
        }
    }
});
exports.getItems = getItems;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const data = yield items_model_1.default.findOne({ where: { id: Number(id) } });
        console.log(data);
        if (!data) {
            throw new Error("Usuario no encontrado");
        }
        res.status(200).json(data);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).send(error.message);
    }
});
exports.getItem = getItem;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const datos = yield items_model_1.default.save(req.body);
        res.status(200).json(datos);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(504).send(error.message);
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const datos = yield items_model_1.default.findOne({ where: { id: Number(id) } });
        if (!datos) {
            throw new Error("Usuario no encontrado");
        }
        yield items_model_1.default.update({ id: Number(id) }, req.body);
        const datos2 = yield items_model_1.default.findOne({ where: { id: Number(id) } });
        res.status(200).json(datos2);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(504).send(error.message);
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const dato = items_model_1.default.findOne({ where: { id: Number(id) } });
        if (!dato) {
            throw new Error("Usuario no existe");
        }
        items_model_1.default.delete({ id: Number(id) });
        res.status(200).send(id);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).send(error.message);
    }
});
exports.deleteItem = deleteItem;
//# sourceMappingURL=items.js.map