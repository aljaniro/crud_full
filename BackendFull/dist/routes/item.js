"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ruta = void 0;
const express_1 = __importDefault(require("express"));
const items_1 = require("../controllers/items");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const ruta = express_1.default.Router();
exports.ruta = ruta;
ruta
    .get("/api/user", (0, validateJWT_1.default)("admin"), items_1.getuser)
    .post("/api/user", items_1.getuser)
    .get("/api/item", items_1.getItems)
    .get("/api/item/:id", (0, validateJWT_1.default)("admin"), items_1.getItem);
ruta.post("/api/item", items_1.createItem)
    .put("/api/item/:id", items_1.updateItem)
    .delete("/api/item/:id", items_1.deleteItem);
//# sourceMappingURL=item.js.map