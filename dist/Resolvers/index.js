"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hello_1 = __importDefault(require("./Hello"));
const Register_1 = __importDefault(require("./User/Register"));
const Login_1 = __importDefault(require("./User/Login"));
const Me_1 = __importDefault(require("./User/Me"));
const RefreshToken_1 = __importDefault(require("./User/RefreshToken"));
const RoleList_1 = __importDefault(require("./Role/RoleList"));
const RoleCreate_1 = __importDefault(require("./Role/RoleCreate"));
const Resolvers = [
    Me_1.default,
    Hello_1.default,
    Register_1.default,
    Login_1.default,
    RefreshToken_1.default,
    RoleList_1.default,
    RoleCreate_1.default
];
exports.default = Resolvers;
//# sourceMappingURL=index.js.map