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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../Entity/User");
const LoginInput_1 = require("./Login/LoginInput");
const Token_1 = require("../../Entity/Token");
const JwtSign_1 = require("../../JwtSign");
let LoginResolver = class LoginResolver {
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const errorMessage = `Invalid email or password`;
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                throw (new Error(errorMessage));
            }
            const valid = yield bcryptjs_1.default.compare(password, user.password);
            if (!valid) {
                throw (new Error(errorMessage));
            }
            const token = new Token_1.Token();
            token.accessToken = JwtSign_1.JwtSign(user, 'access');
            token.refreshToken = JwtSign_1.JwtSign(user, 'refresh');
            token.user = user;
            return token;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Token_1.Token),
    __param(0, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput_1.LoginInput]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "login", null);
LoginResolver = __decorate([
    type_graphql_1.Resolver()
], LoginResolver);
exports.default = LoginResolver;
//# sourceMappingURL=Login.js.map