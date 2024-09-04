"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let login = class login extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], login.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, class_validator_1.Length)(4, 20),
    __metadata("design:type", String)
], login.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, class_validator_1.Length)(4, 20),
    __metadata("design:type", String)
], login.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: () => 'visited' }),
    __metadata("design:type", String)
], login.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: () => 'true' }),
    __metadata("design:type", Boolean)
], login.prototype, "status", void 0);
login = __decorate([
    (0, typeorm_1.Entity)("login")
], login);
exports.default = login;
//# sourceMappingURL=login.model.js.map