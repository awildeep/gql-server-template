"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
dotenv_1.config({ path: path_1.resolve(__dirname, "../.env") });
const setup = () => {
    let jwtSecret = process.env.JWT_SECRET || "";
    let jwtSecretFile = process.env.JWT_SECRET_FILE || "";
    if (jwtSecretFile !== "") {
        if (fs_1.default.existsSync(jwtSecretFile)) {
            const jwtBuffer = fs_1.default.readFileSync(jwtSecretFile);
            jwtSecret = jwtBuffer.toString();
        }
        else {
            throw (new Error('JWT_SECRET_FILE has an incorrect value'));
        }
    }
    if (!process.env.CORS_DOMAIN || process.env.CORS_DOMAIN === '') {
        throw (new Error('CORS_DOMAIN has an incorrect value'));
    }
    return ({
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || '3000',
        JWT_SECRET: jwtSecret,
        JWT_SECRET_FILE: jwtSecretFile,
        GQL_AUTH_TOKEN_NAME: process.env.GQL_AUTH_TOKEN_NAME || 'authorization',
        CORS_DOMAIN: process.env.CORS_DOMAIN
    });
};
const EnvironmentConfig = setup();
exports.default = EnvironmentConfig;
//# sourceMappingURL=EnvironmentConfig.js.map