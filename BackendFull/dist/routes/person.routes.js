"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rutas = void 0;
const express_1 = require("express");
const person_1 = require("../controllers/person");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const rutas = (0, express_1.Router)();
exports.rutas = rutas;
//rutas.get("/api/person",validateJwt,getpersons)
rutas.get("/api/person", (0, validateJWT_1.default)("admin"), person_1.getpersons)
    .get("/api/person/:id", (0, validateJWT_1.default)("admin"), person_1.getperson)
    .post("/api/person", (0, validateJWT_1.default)("admin"), person_1.createPerson)
    .put("/api/person/:id", (0, validateJWT_1.default)("admin"), person_1.updatePerson)
    .delete("/api/person/:id", (0, validateJWT_1.default)("admin"), person_1.deletePerson);
//# sourceMappingURL=person.routes.js.map