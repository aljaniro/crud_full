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
exports.deletePerson = exports.updatePerson = exports.createPerson = exports.getperson = exports.getpersons = void 0;
const personas_model_1 = __importDefault(require("../models/personas.model"));
const label_1 = __importDefault(require("../label"));
const getpersons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("aqui estoy");
        const lista = yield personas_model_1.default.find();
        if (lista.length <= 0) {
            return res.status(400).json({
                msg: "Lista vacia",
                error: label_1.default.MSG_400
            });
        }
        res.status(200).json(lista);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(504).send(error.message);
    }
});
exports.getpersons = getpersons;
const getperson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const persona = yield personas_model_1.default.findOne({ where: { id: Number(id) } });
        if (!persona) {
            return res.status(400).json({
                msg: "INTENTE DE NUEVO",
                error: label_1.default.MSG_400
            });
        }
        res.status(200).json({
            msg: "ENCONTRADO",
            persona: persona
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(504).send(error.message);
    }
});
exports.getperson = getperson;
const createPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, apellido, email, tipoDocumento, documento } = req.body;
        const persona = yield personas_model_1.default.save({
            nombre: nombre, apellido: apellido, email: email, tipoDocumento: tipoDocumento, documento: documento
        });
        if (!personas_model_1.default) {
            return res.status(400).json({
                msg: "error al crear persona"
            });
        }
        res.status(200).json({
            msg: "Persona creada",
            persona: persona
        });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(504).send(error.message);
    }
});
exports.createPerson = createPerson;
const updatePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("se esta actualizando");
        const id = req.params.id;
        const { nombre, apellido, email, tipoDocumento, documento } = req.body;
        const datos = yield personas_model_1.default.findOne({ where: { id: Number(id) } });
        if (!datos) {
            throw new Error("Usuario no encontrado");
        }
        yield personas_model_1.default.update({ id: Number(id) }, {
            nombre: nombre, apellido: apellido, email: email, tipoDocumento: tipoDocumento, documento: documento
        });
        const datos2 = yield personas_model_1.default.findOne({ where: { id: Number(id) } });
        res.status(200).json(datos2);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(504).send(error.message);
    }
});
exports.updatePerson = updatePerson;
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const dato = personas_model_1.default.findOne({ where: { id: Number(id) } });
        if (!dato) {
            throw new Error("Usuario no existe");
        }
        personas_model_1.default.delete({ id: Number(id) });
        res.status(200).send(id);
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).send(error.message);
    }
});
exports.deletePerson = deletePerson;
//# sourceMappingURL=person.js.map