"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_1 = require("../controllers/items");
const validate_1 = require("../middlewares/validate");
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const route = (0, express_1.Router)();
route
    .post("/login", 
//  check('username',label.EMPTY_FIELD).not().isEmpty,
//  check('password',label.EMPTY_FIELD).not().isEmpty,
//   check('role',label.EMPTY_FIELD).not().isEmpty,
//  check('status',label.EMPTY_FIELD).not().isEmpty
items_1.getuser)
    .post('/validate-token', validateToken_1.default)
    .post("/register", validate_1.validateform, items_1.register)
    .post("/logout", (req, res) => {
    res.clearCookie("auth", { path: "/" });
    res.send("Cookie eliminada correctamente");
});
exports.default = route;
//# sourceMappingURL=login.routes.js.map