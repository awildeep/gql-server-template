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
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Role_1 = require("./Role");
let UserRole = class UserRole extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn({ name: 'user_role_id' }),
    __metadata("design:type", Number)
], UserRole.prototype, "userRoleId", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.ManyToOne(() => User_1.User, user => user.userRoles),
    typeorm_1.JoinColumn({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], UserRole.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.ManyToOne(() => Role_1.Role, role => role.roleUsers),
    typeorm_1.JoinColumn({ name: "role_id" }),
    __metadata("design:type", Role_1.Role)
], UserRole.prototype, "role", void 0);
UserRole = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity({ name: 'user_role' })
], UserRole);
exports.UserRole = UserRole;
//# sourceMappingURL=UserRole.js.map